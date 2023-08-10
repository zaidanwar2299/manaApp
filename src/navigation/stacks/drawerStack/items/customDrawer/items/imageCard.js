import React from "react";
import { Image, Text, View,TouchableOpacity } from "react-native";
import Fonts from "../../../../../../assets/fonts";
import CustomImage from "../../../../../../components/views/customImage";

const ImageCard = ({
    onPress,
    name,
    email,
    imageSource
}) => {
    return (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
            }}>
            <CustomImage
                style={{
                    width: 73,
                    height: 73,
                    borderRadius: 10,
                    resizeMode: 'cover',
                    marginRight: 10
                }}
                source={imageSource}
            />
            <View
            style={{
                flexShrink:1
            }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 14,
                        fontFamily: Fonts.semiBold,
                        color: "black"
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: Fonts.regular,
                        color: "grey",
                        marginTop: 5
                    }}>
                    {email}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ImageCard