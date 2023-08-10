import React, {useEffect, useState} from 'react';
import {
  Image,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../../../assets/fonts';
import theme from '../../../common/theme';
import {Ionicons, AntDesign, Zocial} from '../../../assets/vectorIcons';
import {AppStyles, Typo} from '../../../common/styles';
import TagCard from './items/tagCard';
import icons from '../../../assets/icons';

const PrimaryInput = props => {
  let {
    containerStyle,
    secureText,
    title,
    titleStyle,
    innerContainerStyle,
    inputStyle,
    renderInput = item => <TextInput {...item} />,
    renderRightItem,
    inputType,
    tagProps = {
      onTagChange: () => {},
      value: null,
    },
    leftIconProps,
    loading,
  } = props;

  leftIconProps = {
    icon: null,
    imageSource: null,
    color: theme.primary,
    type: 'inner',
    size: 25,
    ...(leftIconProps?.type == 'outer' && {
      size: 30,
    }),
    ...leftIconProps,
  };

  let [state, _setState] = useState({
    passVisibilty: false, // password visibility
    input: '',
    tags: [],
  });

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item,
    };
    _setState({...state});
  };

  const checkIcon = () => {
    if (leftIconProps.icon) {
      return (
        <Ionicons
          name={leftIconProps.icon}
          size={leftIconProps.size}
          color={leftIconProps.color}
          style={{
            marginRight: 10,
          }}
        />
      );
    }
    if (leftIconProps.imageSource) {
      return (
        <Image
          style={{
            width: leftIconProps.size,
            height: leftIconProps.size,
            resizeMode: 'contain',
            marginRight: 10,
            tintColor: leftIconProps.color,
          }}
          source={leftIconProps.imageSource}
        />
      );
    }
  };

  const handleAddTag = () => {
    if (!state.input.length) {
      return;
    }
    state.tags.push({
      text: state.input,
      id: Math.random().toString(),
    });
    state.input = '';
    setState({...state});
  };

  useEffect(() => {
    if (Array.isArray(tagProps.value)) {
      setState({tags: tagProps.value});
    }
  }, [tagProps.value]);

  useEffect(() => {
    setTimeout(() => {
      tagProps.onTagChange(state.tags);
    }, 200);
  }, [state.tags.length]);

  return (
    <View style={containerStyle}>
      {title ? (
        <Text
          style={[
            {
              ...Typo.cardTitle,
              marginBottom: AppStyles.card.titleBottomSpace,
              marginTop: AppStyles.topSpace,
            },
            titleStyle,
          ]}>
          {title}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {leftIconProps.type == 'outer' && checkIcon()}
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              paddingLeft: AppStyles.card.innerLeftSpace,
              borderWidth: 0.5,
              borderColor: 'grey',
              flexShrink: 1,
              backgroundColor: 'white',
              overflow: 'hidden',
            },
            innerContainerStyle,
          ]}>
          {leftIconProps.type == 'inner' && checkIcon()}
          {typeof renderInput == 'function' &&
            renderInput({
              placeholderTextColor: 'grey',
              secureTextEntry: secureText && !state.passVisibilty,
              style: [
                {
                  ...Typo.cardCaption,
                  height: 50,
                  includeFontPadding: false,
                  padding: 0,
                  flexGrow: 1,
                  color: 'black',
                  marginRight: 10,
                  ...(inputType == 'paragraph' && {
                    height: 125,
                    textAlignVertical: 'top',
                    marginVertical: 8,
                    fontSize: 12,
                  }),
                },
                inputStyle,
              ],
              ...(inputType == 'tag' && {
                onChangeText: text => {
                  setState({input: text});
                },
                value: state.input,
                onSubmitEditing: handleAddTag,
              }),
              ...(inputType == 'paragraph' && {
                multiline: true,
              }),
              ...props,
            })}
          {secureText && (
            // <Ionicons
            //     name={state.passVisibilty ? "eye" : "eye-off"}
            //     color={theme.primary}
            //     size={20}
            //     style={{
            //         paddingRight: 10,
            //     }}
            //     onPress={() => {
            //         setState({ passVisibilty: !state.passVisibilty })
            //     }}
            // />
            // <
            <TouchableOpacity
              onPress={() => {
                setState({passVisibilty: !state.passVisibilty});
              }}
              style={{paddingRight: 10}}>
              <Image
                source={state.passVisibilty ? icons.eyeOn : icons.eyeOff}
                resizeMode="contain"
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          )}
          {inputType == 'tag' && state.input.length ? (
            <Ionicons
              name="add"
              size={30}
              color={theme.primary}
              style={{
                paddingRight: 10,
              }}
              onPress={handleAddTag}
            />
          ) : null}
          {loading && (
            <ActivityIndicator
              color={theme.primary}
              style={{
                marginRight: 10,
              }}
            />
          )}
          {typeof renderRightItem == 'function' && renderRightItem()}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {state.tags.map((item, index) => {
          return (
            <TagCard
              key={item.id}
              text={item.text}
              onDelPress={() => {
                state.tags.splice(index, 1);
                setState({...state});
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PrimaryInput;
