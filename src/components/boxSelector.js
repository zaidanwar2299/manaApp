import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native"
import {  Typo } from "../../../common/styles";
import useDelayFn from "../hooks/useDelayFn";
import theme from "../common/theme";
import Fonts from "../assets/fonts";


const priceItems = [
    {
        id: "0",
        name: "$"
    },
    {
        id: "1",
        name: "$$"
    },
    {
        id: "2",
        name: "$$$"
    },
]

const BoxSelector = ({
    data=[],
    value,
    onChange = ()=>{}
}) => {
    const [selected, setSelected] = useState(value)

    useEffect(()=>{
        setSelected(value)
    },[value])

    useDelayFn(()=>{
        onChange(selected)
    },[selected])

    return (
            <View
                style={{
                    flexDirection: 'row',
                }}>
                {data.map((item) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setSelected(item)
                            }}
                            key={"PriceItem" + item.id}
                            activeOpacity={0.7}
                            style={{
                                width: 70,
                                height: 50,
                                backgroundColor: selected?.id == item.id ? theme.primary : theme.lightBg,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        >
                            <Text
                                style={{
                                    color: selected?.id == item.id ? "white" : "black",
                                    fontSize: 13,
                                    fontFamily: Fonts.semiBold,
                                }}>
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
    )
}

export default BoxSelector;