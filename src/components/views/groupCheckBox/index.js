import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Fonts from "../../../assets/fonts";
import { AppStyles } from "../../../common/styles";
import theme from "../../../common/theme";
import useDelayFn from "../../../hooks/useDelayFn";
import EmptyCard from "../../cards/emptyCard";
import CheckBox from "./items/checkBox";

const GroupCheckBox = (props) => {
    let {
        containerStyle,
        title,
        titleStyle,
        data = [],
        selectionType = "single", // single, multi,
        onChange = () => { },
        value, // single ? object , multi ? array
        loading,
        viewStyle, // collumn || row , default is collumn
        keyExtractor
    } = props

    let [state, _setState] = useState({
        selected: selectionType == "multi" ? [] : null
    })

    const setState = (item = {}) => {
        state = {
            ...state,
            ...item
        }
        _setState({ ...state })
    }

    useEffect(() => {
            setState({ selected: value })
    }, [value])

    useDelayFn(() => {
        onChange(state.selected)
    }, [state.selected])

    if (loading) {
        return (
            <ActivityIndicator
                animating
                color={theme.primary}
                style={{
                    alignSelf: "flex-start"
                }}
            />
        )
    }

    if (!data.length) {
        return (
            <EmptyCard /> 
        )
    }

    // console.log(state)

    return (
        <View
            style={[
                (viewStyle == 'row' && {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                }),
                containerStyle,
            ]}
        >
            {title ?
                <Text
                    style={[{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: Fonts.bold,
                        marginBottom: 5,
                        marginTop: AppStyles.topSpace
                    },
                        titleStyle
                    ]}>
                    {title}
                </Text> : null}
            {data.map((item, index) => {

                let isChecked = false

                if (selectionType == 'single' && state.selected?.id == item.id) {
                    isChecked = true
                }

                if (selectionType == 'multi' && state.selected?.filter((fItem) => fItem.id == item.id).length) {
                    isChecked = true
                }

                let key = "CheckBoxItem" + item.id

                if (typeof (keyExtractor) == "function") {
                    key = keyExtractor(item, index)
                }

                return (
                    <CheckBox
                        key={key}
                        disableBuiltInState
                        isChecked={isChecked}
                        onPress={() => {
                            if (selectionType == 'single') {
                                if (isChecked) {
                                    state.selected = null
                                } else {
                                    state.selected = item
                                }
                            } else if (selectionType == 'multi') {
                                if (isChecked) {
                                    const _filter = state.selected.filter((fItem) => fItem.id != item.id)
                                    state.selected = _filter
                                } else {
                                    state.selected.push(item)
                                }
                            }
                            setState({ ...state })
                        }}
                        textStyle={{
                            fontSize: 13,
                        }}
                        style={{
                            marginTop: 10
                        }}
                        size={22}
                        text={item.name}
                        {...item}
                    />
                )
            })}
        </View>
    )
}

export default GroupCheckBox;