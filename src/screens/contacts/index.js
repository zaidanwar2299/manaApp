import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Header from '../../components/views/header';
import {AppStyles} from '../../common/styles';
import Fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';
import {Appointment, ContactList} from '../../common/constants';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import {navigate} from '../../navigation/navigation.utils';
import Routes from '../../navigation/routes';
import PrimaryInput from '../../components/inputs/primaryInput';
import EmptyCard from '../../components/cards/emptyCard';
import Checkbox from '../../components/views/groupCheckBox/items/checkBox';
import PrimaryButton from '../../components/buttons/primaryButton';

const Contacts = () => {
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = ContactList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // const [modalAppointVisible, setModalAppointVisible] = useState(false);
  // // const [modalVisible, setModalVisible] = useState(false);

  // const appointToggle = () => {
  //   setModalAppointVisible(!modalAppointVisible);
  // };

  // const modalToggle = () => {
  //   setModalVisible(!modalVisible);
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  let [state, _setState] = useState({
    appointment: null,
    // ...params.filter_item
  });

  return (
    <View style={{padding: 15, flex: 1}}>
      <Header
        showBack={false}
        renderLeftItem={() => (
          <Text style={{...styles.contactsHeader}}>{'Contacts'}</Text>
        )}
        renderRightItem={() => (
          <View style={[styles.headerIcons]}>
            <TouchableOpacity onPress={() => navigate(Routes.AddContacts)}>
              <Image source={icons.plusCircle} style={{...styles.imageStyle}} />
            </TouchableOpacity>
            <Spacer width={15} />
            <TouchableOpacity onPress={() => modalToggle()}>
              <Image source={icons.calendar} style={{...styles.imageStyle}} />
            </TouchableOpacity>
            <Spacer width={15} />
            <TouchableOpacity onPress={() => navigate(Routes.ContactSetting)}>
              <Image source={icons.settings} style={{...styles.imageStyle}} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Spacer height={5} />
      <PrimaryInput
        leftIconProps={{icon: 'search-outline', color: theme.grey200}}
        placeholder="Search contacts"
        innerContainerStyle={{...styles.inputInnerStyle}}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Spacer height={5} />
      <UnderLine width={insets.right + 400} />
      <View style={{flex: 1}}>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyCard />}
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

      {/* Calendar Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        swipeDirection={['down']} // Configure swipe directions
        onSwipeComplete={modalToggle} // Function to call when modal is swiped
        onBackdropPress={modalToggle}
        backdropOpacity={0}
        style={{
          marginRight: insets.right,
          marginLeft: insets.left,
          marginTop: insets.top - 60,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        <View style={{...styles.modalDesign}}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <View style={[styles.swiperHolder]} />
            {/* <Text
              style={{
                ...AppStyles.h11,
                fontSize: 28,
                fontFamily: Fonts.bold,
              }}>
              {'Show Appointments'}
            </Text> */}
            <Header
              showBack={false}
              title="Shared Calendars"
              containerStyle={{marginTop: 10, marginRight: 10}}
              titleStyle={{...styles.headerFontStyle}}
              renderRightItem={() => (
                <TouchableOpacity
                  onPress={() => {
                    navigate(Routes.CalendarGroup);
                    setModalVisible(false);
                  }}>
                  <Image
                    source={icons.settings}
                    style={{height: 25, width: 25, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
            />
            <View style={{marginTop: 15}}></View>
            <Text style={{...styles.modalFontStyle}}>
              {'Show only contacts that share these calendars.'}
            </Text>
            <View style={{marginTop: 20}}></View>

            {/* Appointment Body */}
            <>
              {Appointment.map((item, index) => (
                <View key={index} style={{...styles.appointmentBody}}>
                  <View style={{paddingHorizontal: 20, ...styles.spaceBetween}}>
                    <View style={{...styles.flexRow}}>
                      <View
                        style={{...styles.dot, backgroundColor: item.color}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: Fonts.regular,
                          fontSize: 15,
                          alignSelf: 'center',
                        }}>
                        {item.name}
                      </Text>
                    </View>

                    <View>
                      <Checkbox
                        value={state.appointment}
                        onChange={value => {
                          setState({appointment: value});
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </>
            <Spacer height={20} />
            <PrimaryButton
              innerContainerStyle={{width: '90%', alignSelf: 'center'}}
              labelStyle={{fontSize: 15, fontFamily: Fonts.bold}}
              label={'Save'}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contactsHeader: {
    fontSize: 33,
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.bold,
    alignSelf: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: theme.grey100,
  },
  modalFontStyle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: theme.grey100,
    alignSelf: 'center',
  },
  headerFontStyle: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    color: 'white',
    alignSelf: 'center',
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputInnerStyle: {
    borderRadius: 40,
    height: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: '50%',
    bottom: -45,
    position: 'absolute',
    paddingBottom: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  appointmentBody: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.secondary,
    borderRadius: 15,
    marginBottom: 20,
  },
  dot: {
    height: 12,
    width: 12,
    // backgroundColor: theme.pink,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default Contacts;
