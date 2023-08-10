import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import PrimaryInput from '../../../components/inputs/primaryInput';
import theme from '../../../common/theme';
import Header from '../../../components/views/header';
// import {AntDesign, Feather} from '../../../assets/vectorIcons';
import {AppStyles, Typo} from '../../../common/styles';
// import {Spacer} from '../../../components/Spacer';
import PrimaryButton from '../../../components/buttons/primaryButton';
import Fonts from '../../../assets/fonts';
// import icons from '../../../assets/icons';
import CustomImage from '../../../components/views/customImage';
// import {navigate} from '../../../navigation/navigation.utils';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../assets/icons';
import Routes from '../../../navigation/routes';
import { Spacer } from '../../../components/Spacer';
// import CustomText from '../../../components/CustomText';

const Register = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header
        containerStyle={{marginLeft: 16}}
        showBack={false}
        renderLeftItem={() => (
          <Image style={AppStyles.image1} source={icons.isBack} />
        )}
      />
      <Text style={[{...AppStyles.h1}]}>Sign Up</Text>
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
          placeholderTextColor={theme.lightGrey}
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
          placeholderTextColor={theme.lightGrey}
          placeholder={'Enter password'}
        />

        <PrimaryInput
          secureText
          title="Confrim password"
          titleStyle={[{...Typo.h2, color: theme.grey100}]}
          innerContainerStyle={{
            backgroundColor: theme.secondary,
            height: 53,
            width: '100%',
          }}
          inputStyle={{color: theme.grey100}}
          placeholderTextColor={theme.lightGrey}
          placeholder={'Enter password'}
        />

        <Spacer height={40} />
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
            }}>
            {'Already have account?'}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Login)}>
            <Text style={{color: theme.blue, marginTop: 14}}>{' Sign In'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Register;

