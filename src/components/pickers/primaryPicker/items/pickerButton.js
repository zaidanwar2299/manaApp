import React from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import Fonts from "../../../../assets/fonts"
import { Entypo, MaterialCommunityIcons } from "../../../../assets/vectorIcons"
import { AppStyles, Typo } from "../../../../common/styles"
import theme from "../../../../common/theme"
import TagCard from "../../../inputs/primaryInput/items/tagCard"

const _margin = 10

const PickerButton = ({
    containerStyle,
    icon,
    label,
    labelStyle,
    onPress,
    disabled,
    renderRightItem,
    placeholder,
    title = "",
    titleStyle,
    showTargetIcon,
    loading,
    tagProps = {
        data: [],
        onDelPress: () => { }
    },
    showDownIcon = true,
    onTouchEnd,
    labelProps
}) => {
    return (
        <View
            style={containerStyle}
            onTouchEnd={onTouchEnd}
        >
            {title ?
                <Text
                    style={[{
                        // ...Typo.cardTitle,
                        marginBottom: AppStyles.card.titleBottomSpace,
                        marginTop: AppStyles.card.topSpace,
                        ...Typo.h2, fontFamily:Fonts.bold, color: theme.grey100
                    },
                        titleStyle
                    ]}>
                    {title}
                </Text> : null}
            <TouchableOpacity
                disabled={loading || disabled}
                onPress={onPress}
                style={[
                    {
                        flexDirection: "row",
                        borderWidth: 0.5,
                        borderColor: "grey",
                        opacity: disabled ? 0.3 : 1,
                        paddingLeft: AppStyles.card.innerLeftSpace,
                        borderRadius: 10,
                        minHeight: 53,
                      overflow: 'hidden',
                      backgroundColor:theme.secondary
                    }
                ]}
            >
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={22}
                        color={"grey"}
                        style={{
                            marginRight: _margin,
                            alignSelf: "center"
                        }}
                    />
                )}
                <View
                    style={{
                        width: "50%",
                        alignSelf: "center",
                        alignItems: "flex-start",
                        flexGrow: 1,
                        paddingVertical: 15,
                        marginRight: 5
                    }}>
                    {loading ?
                        <ActivityIndicator
                            color={theme.primary}
                            animating
                        /> :
                        <Text
                            style={[
                                {
                                    color: label ? "black" : theme.grey200,
                                    ...Typo.cardCaption,
                                },
                                labelStyle,
                            ]}
                            {...labelProps}
                        >
                            {label || placeholder}
                        </Text>}
                </View>
                {showDownIcon && (
                    <Entypo
                        name="chevron-down"
                        size={20}
                        color={"black"}
                        style={{
                            marginRight: _margin,
                            alignSelf: "center"
                        }}
                    />)}
                {showTargetIcon && (
                    <View
                        style={{
                            width: 48,
                            backgroundColor: theme.lightBg,
                            alignItems: "center",
                            flexShrink: 1,
                            justifyContent: 'center'
                        }}>
                        <MaterialCommunityIcons name="target" size={24} color={theme.primary} />
                    </View>)}
                {typeof renderRightItem == 'function' && renderRightItem()}
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                {tagProps.data.map((item, index) => {
                    return (
                        <TagCard
                            id={item.id}
                            text={item.name}
                            onDelPress={() => {
                                tagProps.onDelPress(item, index)
                            }}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default PickerButton;