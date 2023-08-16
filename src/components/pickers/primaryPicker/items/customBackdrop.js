import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import React, { useMemo } from "react"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle
} from "react-native-reanimated"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SCREEN_HEIGHT } from "../../../../common/styles";

const CustomBackdrop = ({ animatedPosition, style ,onPress}: BottomSheetBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedPosition.value,
            [SCREEN_HEIGHT, 0],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#00000099",
                height: hp(100),
                position: 'absolute',
                width: wp(100)
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle}
    onTouchEnd={onPress}
    />;
};

export default CustomBackdrop;