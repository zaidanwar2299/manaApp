import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PrimaryInput from '../../../components/inputs/primaryInput';
import theme from '../../../common/theme';
import Header from '../../../components/views/header';
import {AppStyles, Typo} from '../../../common/styles';
import PrimaryButton from '../../../components/buttons/primaryButton';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../assets/icons';
import Routes from '../../../navigation/routes';
import {Spacer} from '../../../components/Spacer';

const Login = () => {
  const navigation = useNavigation();
  return (
    <>
    <Spacer height={10} />
      <Header
        containerStyle={{marginLeft: 16}}
        showBack={false}
        renderLeftItem={() => (
          <Image style={AppStyles.image1} source={icons.isBack} />
        )}
      />
      {/* <Spacer height={10} /> */}
      <Text style={[{...AppStyles.h11}]}>Sign In</Text>
      <Spacer height={15} />
      <View style={{paddingHorizontal: 30}}>
        <PrimaryInput
          title="Email"
          titleStyle={[{...Typo.h2, color: theme.grey100}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter your email'}
        />
        {/* <Spacer height={10} /> */}

        <PrimaryInput
          secureText
          title="Password"
          titleStyle={[{...Typo.h2, color: theme.grey100}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter password'}
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
            }}>
            {'Forgot Password?'}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={{color: theme.blue, marginTop: 14}}>
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
            }}>
            {'Don’t have an account?'}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Register)}>
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
    </>
  );
};

export default Login;
