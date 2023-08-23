import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";
import Fonts from "../../../../../assets/fonts";

interface Style {
  container: ViewStyle;
  textContainer: ViewStyle;
  iconImageStyle: ImageStyle;
}

export const _iconContainer = (
  size: number,
  checked: boolean,
  fillColor: string,
  unfillColor: string,
): ViewStyle => {
  return {
    width: size,
    height: size,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: checked ? fillColor : unfillColor,
  };
};

export const _textStyle = (checked: boolean): TextStyle => {
  return {
    // textDecorationLine: checked ? "line-through" : "none",
    includeFontPadding:false,
    padding:0,
      // fontFamily: Fonts.medium ,
      color:checked? "black":"grey",
      fontSize:13,
      marginTop:1,
      lineHeight:20
}
}

export default StyleSheet.create<Style>({
  container: {
    flexDirection: "row",
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 10,
    flexShrink:1
  },
})
