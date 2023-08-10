import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Fonts from "../../../../../../assets/fonts";

const LogoutButton = ({
    loading,
    onPress,
    disabled,
    label
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                borderTopWidth: 0.5,
                borderColor: "grey",
                height: 70,
                paddingLeft: 20,
                justifyContent: "center",
                alignItems:"flex-start",
            }}>
            {loading ?
                <ActivityIndicator
                    animating
                    color="#EB5757"
                /> :
                <Text
                    style={{
                        color: "#EB5757",
                        fontSize: 13,
                        fontFamily: Fonts.semiBold
                    }}>
                    {label}
                </Text>}
        </TouchableOpacity>
    )
}

export default LogoutButton