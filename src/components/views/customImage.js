import React, { useState } from "react";
import { ActivityIndicator, Image, View, StyleSheet } from "react-native";
// import images from "../../assets/images";
import theme from "../../common/theme";

const CustomImage = (props) => {
    let [state, _setState] = useState({
        loading: false,
        isError: false
    })

    const setState = (item = {}) => {
        state = {
            ...state,
            ...item
        }
        _setState({ ...state })
    }

    return (
        <View
            style={{
                backgroundColor: "#f0f0f0",
                overflow:"hidden",
                borderWidth:0.8,
                borderColor:"#E0E0E0",
                ...props.style
            }}>
            <Image
                onLoadStart={() => {
                    setState({
                        loading: true,
                        isError: false
                    })
                }}
                onLoadEnd={() => {
                    setState({ loading: false })
                }}
                onError={() => {
                    setState({
                        loading: false,
                        isError: true
                    })
                }}
                {...props}
                style={{
                    width: "100%",
                    height: "100%",
                    ...props.style
                }}
                resizeMethod='resize'
            />
            <View
                style={{
                    ...StyleSheet.absoluteFill,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {state.loading && (
                    <ActivityIndicator
                        color={theme.primary}
                        animating
                    />
                )}
                {state.isError && (
                    <Image
                        style={{
                            width: "50%",
                            height: "50%",
                            resizeMode: "contain"
                        }}
                        source={{ uri: "https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" }}
                    />
                )}
            </View>
        </View>
    )
}

export default CustomImage