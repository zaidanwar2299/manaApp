import {
  View,
  Text,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Spacer} from '../../components/Spacer';
import theme from '../../common/theme';
import icons from '../../assets/icons';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import Header from '../../components/views/header';
import {Typo} from '../../common/styles';
import PrimaryButton from '../../components/buttons/primaryButton';

const ProfileScreen = () => {
  const ProfileList = [
    {
      id: 1,
      leftItem: 'Time Zone',
      RightItem: 'GMT+2',
    },
    {
      id: 2,
      leftItem: 'Connected Apps (2)',
      RightItem: '2',
    },
    {
      id: 3,
      leftItem: 'My Calendars (2)',
      RightItem: '2',
    },
  ];

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <Spacer height={25} />
      <Header
        showBack={false}
        renderLeftItem={() => (
          <Text
            style={[
              {
                ...Typo.profileHeader,
                padding: 20,
                fontFamily:Fonts.bold
              },
            ]}>
            Profile
          </Text>
        )}
      />
      {/* <Spacer height={5} /> */}

      <View style={{padding: 17}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View>
            <Image
              resizeMode="contain"
              source={icons.profilePhoto}
              style={{height: 55, width: 55}}
            />
          </View>
          <Spacer width={20} />
          <View style={{alignSelf: 'center'}}>
            <Text style={{color: 'white', fontFamily:Fonts.semiBold}}>Alexey Trentia</Text>
            <Spacer height={7} />
            <Text style={{color: theme.blue}}>Edit</Text>
          </View>
        </View>
        <UnderLine />

        <Spacer height={18} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: 'white', fontSize: 15}}>Username:</Text>
            <Spacer width={2} />
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: theme.blue, fontSize: 15}}>
                @alexeytretina
              </Text>
            </View>
          </View>
          <Image
            style={{height: 22, width: 22}}
            resizeMode="contain"
            source={icons.copyIcon}
          />
        </View>

        <Spacer height={5} />
        <UnderLine />
        {/* <Spacer height={5} /> */}
        <Text style={[{...Typo.profileHeader, paddingTop: 20}]}>
          Account Settings
        </Text>
        <Spacer height={20} />
        <View style={[{...styles.spaceBetween}]}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
            }}>
            Notifications
          </Text>
          <Switch
            trackColor={{false: '#767577', true: theme.green}}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <UnderLine />
        {ProfileList.map(item => (
          <TouchableOpacity>
            <Spacer height={15} />
            <View style={[{...styles.spaceBetween, alignItems: 'center'}]}>
              <Text
                style={{
                  color: 'white',
                }}>
                {item.leftItem}
              </Text>
              <View style={[{...styles.flexRow}]}>
                <Text style={{color: theme.grey200}}>{item.RightItem}</Text>
                <Spacer width={12} />
                <Image
                  source={icons.rightIcon}
                  resizeMode="contain"
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
            <Spacer height={5} />
            <UnderLine />
          </TouchableOpacity>
        ))}
      </View>
      <Spacer height={10} />
      <PrimaryButton
        label="log Out"
        innerContainerStyle={{
          backgroundColor: theme.green,
          borderRadius: 25,
          height: 55,
        }}
        containerStyle={{paddingHorizontal: 15}}
        labelStyle={{fontSize: 15, color: 'black'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
