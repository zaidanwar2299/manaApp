import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Fonts from "../../../../assets/fonts"
import { Entypo } from "../../../../assets/vectorIcons"
import theme from "../../../../common/theme"

const SIDE_SPACE= 10

const PickerCard = ({
    onPress,
    title,
    isSelected,
    flag,
    caption,
}) => {
    return (
            <TouchableOpacity
                style={{
                    paddingVertical: 12,
                    paddingLeft: SIDE_SPACE,
                    flexDirection: "row",
                    alignItems: "center",
                    ...(isSelected && {
                        borderWidth: 0.7,
                        borderColor: "grey",
                        borderRadius: 10,
                        backgroundColor: "#f7f7f7",
                    })
                }}
                onPress={onPress}
            >
                {flag && (
                    <Text
                        style={{
                            fontSize: 15,
                            marginRight: AppStyles.sideSpace
                        }}
                    >
                        {flag}
                    </Text>
                )}
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: Fonts.regular,
                        color: "black",
                        includeFontPadding: false,
                        padding: 0,
                        flex: 1,
                        marginRight: SIDE_SPACE
                    }}
                >
                    {title}
                </Text>
                {caption && (
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: Fonts.medium,
                            color: "black",
                            marginRight: SIDE_SPACE,
                            includeFontPadding: false,
                            padding: 0,
                        }}
                    >
                        {caption}
                    </Text>
                )}
                {isSelected && (
                    <Entypo
                        style={{
                            marginRight: SIDE_SPACE
                        }}
                        name="check"
                        size={15}
                        color={theme.primary}
                    />
                )}
            </TouchableOpacity>
    )
}

export default PickerCard;