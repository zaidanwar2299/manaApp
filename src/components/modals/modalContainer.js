import React, {
    createRef,
    useCallback,
    useEffect
} from "react";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import { AntDesign } from "../../assets/vectorIcons";
import { SCREEN_HEIGHT } from "../../common/styles";
import { destroySibling } from "../../utils/modal.utils";

const getMidYPostion = (totalHeight, contentHeight) => {
    return (totalHeight - contentHeight) / 2
}

export const modalRef = createRef()

const ModalContainer = ({
    children,
    bgStyle,
    showClose = true,
    containerStyle,
    isInputExist,
    autoAdjustUpliftPos = true
}) => {
    const sharedValues = {
        translateY: useSharedValue(SCREEN_HEIGHT),
        contentHeight: useSharedValue(0),
        yPosToAnimate: useSharedValue(200), // position to animate in y axis,
    }

    const showKeyboard = useCallback((event) => {
        if (autoAdjustUpliftPos) {
            sharedValues.translateY.value = withTiming(
                getMidYPostion(event.endCoordinates.screenY, sharedValues.contentHeight.value)
            )
        } else {
            sharedValues.translateY.value = withTiming(upliftModalPosRef.current)
        }
    });

    const hideKeyboard = useCallback((event) => {
        sharedValues.translateY.value = withTiming(sharedValues.yPosToAnimate.value)
    });

    useEffect(() => {
        if (!isInputExist) {
            return;
        }
        const subscribeShow = Keyboard.addListener(
            "keyboardDidShow",
            showKeyboard
        );
        const subscribeHide = Keyboard.addListener(
            "keyboardDidHide",
            hideKeyboard
        );

        return () => {
            subscribeShow.remove();
            subscribeHide.remove();
        };
    }, []);

    const derivedValues = {
        bgContainer: {
            color: useDerivedValue(() => {
                "worklet"
                return (
                    interpolate(sharedValues.translateY.value,
                        [SCREEN_HEIGHT, sharedValues.yPosToAnimate.value],
                        [0, 0.5],
                        Extrapolate.CLAMP
                    )
                )
            })
        }
    }

    const reStyles = {
        container: useAnimatedStyle(() => ({
            transform: [
                { translateY: sharedValues.translateY.value }
            ],
            backgroundColor: "white",
            borderRadius: 10,
            overflow: "hidden",
            padding: 20,
            ...containerStyle
        })),
        bgContainer: useAnimatedStyle(() => ({
            paddingHorizontal: 20,
            ...bgStyle,
            backgroundColor: `rgba(0, 0, 0,${derivedValues.bgContainer.color.value})`,
        }))
    }

    // close the modal
    const close = () => {
        sharedValues.translateY.value = withTiming(SCREEN_HEIGHT, null, () => {
            runOnJS(destroySibling)()
        })
    }

    modalRef.current = {
        close,
        // on keyboard open, modal uplift distance
        upliftPosition: null
    }

    return (
        <Animated.View
            onTouchStart={() => {
                Keyboard.dismiss()
            }}
            style={[
                StyleSheet.absoluteFill,
                reStyles.bgContainer,
            ]}
        >
            <Animated.View
                style={reStyles.container}
                onLayout={({ nativeEvent: { layout } }) => {
                    const positionToAnimate = getMidYPostion(SCREEN_HEIGHT, layout.height)
                    sharedValues.contentHeight.value = layout.height
                    sharedValues.yPosToAnimate.value = positionToAnimate
                    sharedValues.translateY.value = withTiming(positionToAnimate)
                }}
            >
                {showClose && (
                    <TouchableOpacity
                        onPress={close}
                        style={{
                            padding: 10,
                            position: "absolute",
                            right: 0,
                            top: 0,
                            zIndex: 10
                        }}>
                        <AntDesign
                            name="close"
                            size={20}
                            color={"#E0E4FF"}
                        />
                    </TouchableOpacity>
                )}
                {children}
            </Animated.View>
        </Animated.View>
    );
}

export default ModalContainer;