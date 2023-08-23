import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from "../../assets/vectorIcons";
import Fonts from '../../assets/fonts';
import theme from '../../common/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EmptyCard = ({
  caption = "Sorry, no data found.",
  containerStyle,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[{
        marginVertical: 10,
        marginRight:10,
        // marginHorizontal: wp(4),
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: 'white',
        ...theme.xLightShadow,
        padding: 10,
        alignSelf:"center"
      },
        containerStyle
      ]}>
      <Text
        style={{
          fontFamily: Fonts.regular,
          fontSize: 15,
          color: "grey",
          lineHeight: 22
        }}>
        {caption}
      </Text>
    </TouchableOpacity>
  );
};

export default EmptyCard;