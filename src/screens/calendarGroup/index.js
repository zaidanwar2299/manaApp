import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/views/header';
import icons from '../../assets/icons';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import {
  ProfileList,
  calendarGroupList,
  calendarList,
} from '../../common/constants';
import Routes from '../../navigation/routes';
import {navigate} from '../../navigation/navigation.utils';
import CustomModal from '../../components/customModal';
import {Spacer} from '../../components/Spacer';
import PrimaryButton from '../../components/buttons/primaryButton';

const CalendarGroup = props => {
  const defaultModal = props.route?.params?.defaultModal;
  console.log('defaultModal', defaultModal);
  const [modalVisible, setModalVisible] = useState(false);

  const modalToggle = () => {
    console.log('toggeleCall');
    setModalVisible(!modalVisible);
  };
useEffect(()=>{
  console.log('useEffect');
  setModalVisible(defaultModal??false)
},[defaultModal])
  const CalendarGroupModal = () => (
    <CustomModal
      modalToggle={modalToggle}
      modalVisible={modalVisible}
      content={
        <View style={{...styles.modalDesign}}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <View style={[styles.swiperHolder]} />
            <Spacer height={10} />
            <View style={{padding: 20}}>
              <Image
                source={icons.successTick}
                style={{
                  height: 80,
                  width: 100,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
              <Spacer height={10} />
              <Text style={{...styles.modalFontStyle}}>{'Group Created'}</Text>
              <Spacer height={15} />
              <Text
                style={{
                  ...styles.fontStyle,
                  alignSelf: 'center',
                  fontFamily: Fonts.regular,
                }}>
                {'The calendar group was successfully created.'}
              </Text>
              <Spacer height={40} />
              <PrimaryButton
                labelStyle={{fontSize: 15, color: 'white'}}
                label={'Done'}
                innerContainerStyle={{backgroundColor: theme.blue}}
                onPress={() => {
                  // navigation.navigate(Routes.CreateAppointment);
                  modalToggle();
                }}
              />
            </View>
          </View>
        </View>
      }
    />
  );

  return (
    <View style={{flex: 1}}>
      <Header
        title={'My Calendar Group'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
        renderRightItem={() => (
          <TouchableOpacity
            onPress={() => navigate(Routes.CreateCalendarGroup)}>
            <Image
              source={icons.circlePlus}
              style={{
                height: 25,
                width: 25,
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
        <View style={{padding: 20}}>
          {calendarGroupList.map((item, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                height: item.members <= 0 ? 80 : 110,
                backgroundColor: theme.secondary,
                borderRadius: 10,
                padding: 15,
                paddingLeft: 17,
                marginTop: 20,
              }}>
              <View style={{...styles.spacebetween}}>
                <View style={{...styles.flexRow}}>
                  <View style={{...styles.dot, backgroundColor: item.color}} />
                  <Text style={{...styles.fontStyleBody, maxWidth: 200}}>
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.fontStyle,
                  }}>{`${item.members} Members`}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  height: '70%',
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  // width: 40,
                }}>
                {item.members > 0 ? (
                  <>
                    {ProfileList.map((item, index) => (
                      <Image
                        key={index}
                        source={item.image}
                        style={{
                          height: 35,
                          width: 35,
                          resizeMode: 'cover',
                          marginLeft: -10,
                        }}
                      />
                    ))}
                  </>
                ) : null}
              </View>
            </View>
          ))}
        </View>
        <CalendarGroupModal />
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
  fontStyleBody: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: 'white',
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
  modalFontStyle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: 'white',
    alignSelf: 'center',
  },
  dot: {
    height: 12,
    width: 12,
    // backgroundColor: theme.pink,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
  swiperHolder: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
    height: 5,
    width: 55,
    backgroundColor: theme.greyCalendar,
    borderRadius: 5,
  },
  modalDesign: {
    width: '100%',
    // padding: 30,
    height: '46%',
    bottom: -45,
    // backgroundColor: 'white',
    position: 'absolute',
    paddingBottom: 20,
  },
});

export default CalendarGroup;
