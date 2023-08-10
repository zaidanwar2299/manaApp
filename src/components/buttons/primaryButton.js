import React from "react"
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native"
import AppTheme from "../../common/theme"
import Fonts from "../../assets/fonts"

const PrimaryButton = ({
    label,
    loading,
    disabled,
    onPress,
    containerStyle,
    labelStyle,
    alignOnEnd,
    innerContainerStyle,
    theme, // inverted, outlined
    renderRightItem,
    renderLeftItem,
    loadingProps
}) => {

    let CValues = {
        bgColor: AppTheme.primary,
        labelColor: "white",
        borderColor: AppTheme.primary
    }

    if (theme == "outlined") {
        CValues.bgColor = "white"
        CValues.labelColor = AppTheme.primary
    }

    if (theme == "inverted") {
        CValues.bgColor = "white"
        CValues.labelColor = AppTheme.primary
        CValues.borderColor = "white"
    }

    return (
        <View
            style={[{
                ...(alignOnEnd && {
                    flex: 1,
                    paddingVertical: 20,
                    justifyContent: 'flex-end',
                }),
            },
                containerStyle
            ]}>
            <TouchableOpacity
                style={[{
                    backgroundColor: CValues.bgColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: CValues.borderColor,
                    opacity: disabled ? 0.7 : 1
                },
                    innerContainerStyle
                ]}
                activeOpacity={0.7}
                disabled={disabled}
                onPress={onPress}
            >
                {loading ? (
                    <ActivityIndicator animating={true} size="small" color={CValues.labelColor} {...loadingProps} />
                ) : (
                    <>
                        {typeof (renderLeftItem) == 'function' && renderLeftItem()}
                        <Text
                            style={[{
                                fontSize: 12,
                                fontFamily: Fonts.bold,
                                color: CValues.labelColor,
                                includeFontPadding: false,
                                padding: 0,
                            },
                                labelStyle
                            ]}
                        >
                            {label}
                        </Text>
                        {typeof (renderRightItem) == 'function' && renderRightItem()}
                    </>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default PrimaryButton;