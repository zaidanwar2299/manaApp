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
// import Fonts from '../../../assets/fonts';

const RestoreAccess = () => {
  const navigation = useNavigation();

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
      <Text style={[{...AppStyles.h11, fontFamily: Fonts.bold}]}>
        Restore access
      </Text>
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
          // value={}
          onChangeText={text => {}}
        />

        <Spacer height={25} />
        <PrimaryButton
          label="Sign In"
          innerContainerStyle={{
            backgroundColor: theme.blue,
            borderRadius: 25,
            height: 55,
          }}
          onPress={() => navigation.navigate(Routes.Login)}
          labelStyle={{fontSize: 15}}
        />

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
      </View>
    </View>
  );
};

export default RestoreAccess;
