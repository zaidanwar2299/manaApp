import React from 'react';
import {ActivityIndicator, Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Fonts from '../../assets/fonts';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from '../../assets/vectorIcons';
import theme from '../../common/theme';
import {goBack} from '../../navigation/navigation.utils';
import CustomImage from './customImage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import icons from '../../assets/icons';

// header custom button
export const HCustomButton = ({
  iconProps,
  loading,
  onPress,
  containerStyle,
}) => {
  iconProps = {
    // name: "",
    // iconType: "",
    color: 'black',
    size: 25,
    ...iconProps,
  };

  const verifyIconType = () => {
    const {iconType} = iconProps;

    if (iconType == 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons {...iconProps} />;
    }
    if (iconType == 'Entypo') {
      return <Entypo {...iconProps} />;
    }
    if (iconType == 'Octicons') {
      return <Octicons {...iconProps} />;
    }
    if (iconType == 'AntDesign') {
      return <AntDesign {...iconProps} />;
    }
    return <Feather {...iconProps} />;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
          borderRadius: 10,
          marginLeft: 5,
          zIndex: 10,
        },
        containerStyle,
      ]}>
      {loading ? (
        <ActivityIndicator animating color={'white'} />
      ) : (
        verifyIconType()
      )}
    </Pressable>
  );
};

const Header = ({
  title,
  showBack = true,
  renderRightItem,
  imageProps,
  rightButtons,
  titleProps = {
    leftIcon: null,
    renderLeftItem: () => {},
  },
  renderLeftItem,
  containerStyle,
  buttonProps,
  onTouchEnd
}) => {
  const insets = useSafeAreaInsets();

  return (
      <View
      onTouchEnd={onTouchEnd}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 50,  
            // borderBottomWidth: 0.5,
            // borderColor: "grey",
            paddingVertical:5,
            marginTop:insets.top,
            zIndex:5,
          },
          containerStyle,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            // left: 5,
            zIndex: 10,
          }}>
          {showBack && (
            // <HCustomButton
            //   onPress={goBack}
            //   {...buttonProps}
            //   iconProps={{
            //     name: 'chevron-left',
            //     //  iconType: "Entypo",
            //     size: 30,
            //     ...buttonProps?.iconProps,
            //   }}
            // />
            <TouchableOpacity onPress={goBack} >

              <Image source={icons.isBack} style={{height:30, width:30, resizeMode:"contain"}} />
            </TouchableOpacity>
          )}
          {typeof renderLeftItem == 'function' && renderLeftItem()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
          }}>
          {typeof titleProps.renderLeftItem == 'function' &&
            titleProps.renderLeftItem({
              size: 24,
              color: theme.primary,
              style: {
                marginRight: 7,
              },
            })}
          {titleProps.leftIcon && (
            <FontAwesome
              name={titleProps.leftIcon}
              size={24}
              color={theme.primary}
              style={{
                marginRight: 7,
              }}
            />
          )}
          <Text
            style={[
              {
                fontSize: 17,
                fontFamily: Fonts.bold,
                color: 'white',
              },
              titleProps.style,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            alignItems: 'center',
            right: 10,
            zIndex: 10,
          }}>
          {imageProps && (
            <CustomImage
              style={{
                resizeMode: 'cover',
                width: 40,
                height: 40,
                borderWidth: 0.5,
                borderColor: 'grey',
                borderRadius: 5,
              }}
              source={imageProps.source}
            />
          )}
          {typeof renderRightItem == 'function' && renderRightItem()}
          {rightButtons?.map((item, index) => {
            if (typeof item.renderItem == 'function') {
              return item.renderItem({buttonProps});
            }

            return (
              <HCustomButton
                key={'RightButtonItem' + index}
                {...buttonProps}
                {...item}
                iconProps={{
                  ...buttonProps?.iconProps,
                  ...item.iconProps,
                }}
              />
            );
          })}
        </View>
      </View>
  );
};

export default Header;
