import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import PrimaryInput from '../../../components/inputs/primaryInput';
import theme from '../../../common/theme';
import Header from '../../../components/views/header';
import {AppStyles, Typo} from '../../../common/styles';
import PrimaryButton from '../../../components/buttons/primaryButton';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../assets/icons';
import Routes from '../../../navigation/routes';
import {Spacer} from '../../../components/Spacer';
import Fonts from '../../../assets/fonts';
import * as yup from 'yup';
import {ErrorMessages, SchemaKeys} from '../../../common/constants';
import {Regex, _isValidate} from '../../../utils/validation.utils';
import FlashMessage from 'react-native-flash-message';
// import Fonts from '../../../assets/fonts';

const Login = () => {
  const navigation = useNavigation();

  let [state, _setState] = useState({
    email: '',
    password: '',
    loading: false,
  });

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item,
    };
    _setState({...state});
  };

  const isValidate = () => {
    let schema = {
      [SchemaKeys.Email]: yup.string().required().email(),
      [SchemaKeys.Password]: yup
        .string()
        .required()
        .matches(Regex.Password, ErrorMessages.Password),
    };
    let values = {
      [SchemaKeys.Email]: state.email,
      [SchemaKeys.Password]: state.password,
    };
    // console.log('SCHEEMMAAA', values);
    return _isValidate(schema, values);
  };

  const handleLogin = () => {
    if (!isValidate()) return;
    navigation.navigate(Routes.BottomTabStack);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.grey800}}>
      <Spacer height={10} />

      <Header
        containerStyle={{marginLeft: 16}}
        showBack={false}
        renderLeftItem={() => (
          <Image style={AppStyles.image1} source={icons.isBack} />
        )}
      />
      {/* <Spacer height={10} /> */}
      <Text style={[{...AppStyles.h11, fontFamily: Fonts.bold}]}>Sign In</Text>
      <Spacer height={15} />
      <View style={{paddingHorizontal: 30}}>
        <PrimaryInput
          title="Email"
          titleStyle={[
            {...Typo.h2, fontFamily: Fonts.bold, color: theme.grey100},
          ]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter your email'}
          value={state.email}
          onChangeText={text => {
            setState({email: text});
            console.log('EMAILLLL', state.email);
          }}
        />
        <PrimaryInput
          secureText
          title="Password"
          titleStyle={[
            {...Typo.h2, fontFamily: Fonts.bold, color: theme.grey100},
          ]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
            // fontFamily:Fonts.bold,
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter password'}
          value={state.password}
          onChangeText={text => {
            setState({password: text});
            console.log('Password', state.password);
          }}
        />

        <Spacer height={25} />
        <PrimaryButton
          label="Sign In"
          innerContainerStyle={{
            backgroundColor: theme.blue,
            borderRadius: 25,
            height: 55,
          }}
          onPress={() => navigation.navigate(Routes.BottomTabStack)}
          // onPress={handleLogin}
          // onPress={() => <FlashMessage message='Nothing' type='' />}
          labelStyle={{fontSize: 15}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              ...Typo.textButton,
              paddingTop: 15,
              textAlign: 'center',
              fontFamily: Fonts.regular,
            }}>
            {'Forgot password?'}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.RestoreAccess)}>
            <Text
              style={{
                color: theme.blue,
                marginTop: 14,
                fontFamily: Fonts.regular,
              }}>
              {' Restore access'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 4,
          }}>
          <Text
            style={{
              ...Typo.textButton,
              paddingTop: 15,
              textAlign: 'center',
              fontFamily: Fonts.regular,
            }}>
            {'Don’t have an account?'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Register)}>
            <Text style={{color: theme.blue, marginTop: 14}}>{' Sign up'}</Text>
          </TouchableOpacity>
        </View>

        {/* Social Icons */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '70%',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            marginTop: 30,
          }}>
          <TouchableOpacity>
            <Image
              source={icons.appleBtn}
              resizeMode="contain"
              style={{height: 45, width: 45}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.googleBtn}
              resizeMode="contain"
              style={{height: 45, width: 45}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.facebookBtn}
              resizeMode="contain"
              style={{height: 45, width: 45}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
