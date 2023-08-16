import {View, Text, Image, TouchableOpacity} from 'react-native';
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
import Fonts from '../../../assets/fonts';

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1, backgroundColor:theme.grey800}}>
      <Spacer height={10} />
      <Header
        containerStyle={{marginLeft: 16}}
        showBack={false}
        renderLeftItem={() => (
          <Image style={AppStyles.image1} source={icons.isBack} />
        )}
      />
      <Text style={[{...AppStyles.h11, fontFamily:Fonts.bold}]}>Sign Up</Text>
      <Spacer height={10} />
      <View style={{paddingHorizontal: 30}}>
        <PrimaryInput
          title="Email"
          titleStyle={[{...Typo.h2, color: theme.grey100, fontFamily:Fonts.bold}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter your email'}
        />

        <PrimaryInput
          secureText
          title="Password"
          titleStyle={[{...Typo.h2, color: theme.grey100, fontFamily:Fonts.bold}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter password'}
        />

        <PrimaryInput
          secureText
          title="Confrim password"
          titleStyle={[{...Typo.h2, color: theme.grey100, fontFamily:Fonts.bold}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.grey200}
          placeholder={'Enter password'}
        />

        <Spacer height={30} />
        <PrimaryButton
          label="Sign Up"
          innerContainerStyle={{
            backgroundColor: theme.blue,
            borderRadius: 25,
            height: 55,
          }}
          labelStyle={{fontSize: 15}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...Typo.textButton,
              paddingTop: 15,
              textAlign: 'center',
              fontFamily:Fonts.regular
            }}>
            {'Already have account?'}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={{color: theme.blue, marginTop: 15, fontSize: 14}}>
              {' Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
