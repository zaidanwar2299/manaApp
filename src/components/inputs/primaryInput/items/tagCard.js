import React from "react"
import { Text, View } from "react-native"
import Fonts from "../../../../assets/fonts"
// import { AntDesign } from "../../../../assets/vectorIcons"
import theme from "../../../../common/theme"

const TagCard = ({
    text,
    onDelPress
}) => {
  return (
    <View
    style={{
      flexDirection: 'row',
      paddingHorizontal: 10,
      borderRadius: 10,
      paddingVertical: 8,
      backgroundColor: theme.lightBg,
      alignItems: 'center',
      marginRight:10,
      marginTop:10
    }}>
    <Text
      style={{
        fontFamily: Fonts.medium,
        color: "black",
        fontSize: 12,
        marginRight: 5,
      }}>
      {text}
    </Text>
    <AntDesign name="close" size={15} color="red"
    onPress={onDelPress}
    />
  </View>
  )
}

export default TagCard;