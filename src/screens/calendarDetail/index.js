import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/views/header';
import Routes from '../../navigation/routes';
import icons from '../../assets/icons';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import {Spacer} from '../../components/Spacer';
import theme from '../../common/theme';
import {Switch} from 'react-native';
import UpComingEvents from './items/UpComingEvents';
import NonMembersSwitch from './items/NonMembersSwitch';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContactList} from '../../common/constants';
import {navigate} from '../../navigation/navigation.utils';
import PrimaryButton from '../../components/buttons/primaryButton';

const CalendarDetail = () => {
  const insets = useSafeAreaInsets();
  // Toggle Switch
  const [isPrivate, setIsPrivate] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const togglePrivate = () => setIsPrivate(previousState => !previousState);
  const toggleHidden = () => setIsHidden(previousState => !previousState);
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Work Calendar'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
        renderRightItem={() => (
          <TouchableOpacity
            onPress={() => navigate(Routes.CreateCalendarGroup)}>
            <Image
              source={icons.edit}
              style={{
                height: 23,
                width: 23,
                resizeMode: 'contain',
                marginRight: 5,
              }}
              tintColor={'white'}
            />
          </TouchableOpacity>
        )}
      />
      <UnderLine />
      <ScrollView>
        <Spacer height={20} />
        <TouchableOpacity>
          <View style={{...styles.cameraBody}}>
            <Image source={icons.cameraPlus} style={{...styles.cameraIcon}} />
          </View>
        </TouchableOpacity>
        <View style={{padding: 20}}>
          <Text
            style={{...styles.fontStyle, textAlign: 'center', fontSize: 14}}>
            {'Calendar for work-related appointments and meetings.'}
          </Text>
          {/* Events */}
          <UpComingEvents />
          <Spacer height={20} />
          {/* Non-members Switch */}
          <NonMembersSwitch
            toggleHidden={toggleHidden}
            isHidden={isHidden}
            togglePrivate={togglePrivate}
            isPrivate={isPrivate}
          />
          <Spacer height={20} />
          <Text style={{...styles.membersFont}}>{'Members'}</Text>
        </View>
        <View style={{flex: 1, padding: 20}}>
          <FlatList
            data={ContactList}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => navigate(Routes.ContactDetail)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 18,
                  }}
                  key={index}>
                  <View style={{...styles.flexRow, alignItems: 'center'}}>
                    <Image
                      source={icons.profilePhoto}
                      style={{height: 39, width: 39, resizeMode: 'contain'}}
                    />
                    <Spacer width={10} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: Fonts.regular,
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <Image
                      source={icons.calendarPlus}
                      style={{height: 23, width: 23, resizeMode: 'contain'}}
                    />
                  </View>
                </View>
                <UnderLine />
              </TouchableOpacity>
            )}
          />
        </View>
        <PrimaryButton
          renderLeftItem={() => (
            <Image
              source={icons.calendar}
              style={{
                height: 25,
                width: 25,
                marginRight: 5,
                tintColor: theme.grey800,
              }}
            />
          )}
          containerStyle={{width: '90%', alignSelf: 'center'}}
          label={"What's Open"}
        />
        <Spacer height={30} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: theme.grey100,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  spacebetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraBody: {
    height: 100,
    width: 100,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: theme.greyCalendar,
  },
  cameraIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  membersFont: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: 'white',
  },
});

export default CalendarDetail;
