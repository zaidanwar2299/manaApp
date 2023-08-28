import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/views/header';
import Fonts from '../../assets/fonts';
import Routes from '../../navigation/routes';
import {navigate} from '../../navigation/navigation.utils';
import icons from '../../assets/icons';
import {calendarList} from '../../common/constants';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import CustomModal from '../../components/customModal';
import PrimaryButton from '../../components/buttons/primaryButton';
import {Spacer} from '../../components/Spacer';
// import ModalContainer from '../../components/modals/modalContainer'

const MyCalendar = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const CalendarModal = () => (
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
    <View>
      <Header
        title={'My Calendar'}
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
      <View style={{padding: 20}}>
        {calendarList.map((item, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              height: item.members <= 0 ? 80 : 55,
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
                  alignSelf: 'center',
                }}>{`${item.members} Members`}</Text>
            </View>
          </View>
        ))}
      </View>
      <CalendarModal />
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
  headerFontStyle: {
    fontSize: 30,
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

export default MyCalendar;
