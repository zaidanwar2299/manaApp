import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Fonts from "../../../../../../assets/fonts";
import { AntDesign } from "../../../../../../assets/vectorIcons";

const DrawerCard = ({
    title,
    caption,
    onPress
}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50
            }}>
            <Text
                style={{
                    fontSize: 13,
                    fontFamily: Fonts.medium,
                    color: "black",
                    flex: 1,
                }}>
                {title}
            </Text>
            {caption && (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: "center"
                    }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: Fonts.regular,
                            color: "grey",
                            marginRight: 10,
                        }}>
                        {caption}
                    </Text>
                    <AntDesign name="down" size={15} color="black" />
                </View>)}
        </TouchableOpacity>
    )
}

export default DrawerCard