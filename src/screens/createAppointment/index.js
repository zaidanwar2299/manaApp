import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import PrimaryInput from '../../components/inputs/primaryInput';
import {Spacer} from '../../components/Spacer';
import {AppStyles} from '../../common/styles';
import Fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import PickerButton from '../../components/pickers/primaryPicker/items/pickerButton';
import theme from '../../common/theme';
import UnderLine from '../../components/Underline';
import PrimaryButton from '../../components/buttons/primaryButton';
import _DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/routes';
import {navigate} from '../../navigation/navigation.utils';
import Services from '../../services';
import Geocoder from 'react-native-geocoding';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CreateAppointment = () => {
  const insets = useSafeAreaInsets();

  const [isPrivate, setIsPrivate] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const togglePrivate = () => setIsPrivate(previousState => !previousState);
  const toggleHidden = () => setIsHidden(previousState => !previousState);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDatePicker = () => {
    setModalVisible(!modalVisible);
  };

  const handleDateChange = (event, selected) => {
    // setShowDatePicker(false);
    // setModalVisible(false);
    if (selected) {
      setSelectedDate(selected);
    }
  };

  // const DateModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  const [inputData, setInputData] = useState('');
  const [addedData, setAddedData] = useState([]);

  const handleAddData = () => {
    if (inputData.trim() !== '') {
      setAddedData([...addedData, inputData]);
      setInputData('');
    }
  };
  const removeItem = index => {
    const updatedList = addedData.filter((_, i) => i !== index);
    setAddedData(updatedList);
  };


  // For Time Picker
  const [date, setDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [modalTimeVisible, setModalTimeVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTimePicker(Platform.OS === 'ios'); 
    setDate(currentDate);
  };
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const TimeModal = () => {
    setModalTimeVisible(!modalTimeVisible);
    setShowTimePicker(!showTimePicker);
  };

  const navigation = useNavigation();

  let [state, _setState] = useState({
    location: null,
  });

  const setState = (item = {}) => {
    state = {
      ...state,
      ...item,
    };
    _setState({...state});
  };

   // getting user location and address
   useEffect(() => {
    Services.Location.getLocation().then(res => {
      Geocoder.from(res.latitude, res.longitude).then(res2 => {
        setState({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
            address: res2.results[0]?.formatted_address || '--',
            name: '',
          },
        });
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{...AppStyles.h11, fontFamily: Fonts.bold}}>
          {'Create Appointment'}
        </Text>
        <Spacer height={10} />
        <View style={{paddingHorizontal: 15}}>
          <PrimaryInput
            title="Appointment name"
            placeholder="Enter appointment name"
          />
          <PrimaryInput title="Notes (optional)" placeholder="Enter a note" />

          <PickerButton
            onPress={() => {
              // toggleDatePicker();
              setShowDatePicker(true);
              setModalVisible(true);
              // DateModal();
            }}
            placeholder="Saturday, 2 Jun"
            title="Date"
            label={selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.calendarBlue}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            activeOpacity={0}
            onRequestClose={() => {
              // setModalVisible(!modalVisible);
              setModalTimeVisible(false);
            }}
            // swipeDirection={['down']}
            // onSwipeComplete={() => setModalVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={toggleDatePicker}>
              <View
                style={{
                  ...styles.modalDesign,
                }}>
                <View style={{width: '100%'}}>
                  {showDatePicker && (
                    <_DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="inline"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <PickerButton
            placeholder="Select location"
            label={state.location?.address}
            onPress={() => {
              navigate(Routes.AddLocation, {
                  onSelect: (item) => {
                      setState({
                          location: item
                      })
                  },
                  _value: state.location
              })
          }}
            title="Location"
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.location}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />

          <PickerButton
            onPress={() => {
              toggleTimePicker();
              TimeModal();
            }}
            placeholder="6:00 am - 7:00 am"
            title="Time"
            label={moment(date).format('hh:mm A')}
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.clock}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalTimeVisible}
            activeOpacity={0}
            onRequestClose={() => {
              setModalTimeVisible(false);
              // setShowTimePicker(false);
              // toggleTimePicker();
              // TimeModal();
            }}
            // onSwipeComplete={TimeModal}
            // onModalHide={TimeModal}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={TimeModal}>
              <View
                style={{
                  ...styles.modalTimeDesign,
                }}>
                <View style={{width: '100%'}}>
                  {showTimePicker && (
                    <_DateTimePicker
                      mode={'time'}
                      value={ date ? date : new Date()}
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Modal>


          <PrimaryInput title="Notes (optional)" placeholder="Enter a note" />

        <PrimaryInput
          value={inputData}
          onChangeText={text => setInputData(text)}
          renderRightItem={() => (
            <TouchableOpacity onPress={handleAddData}>
              <Image
                source={icons.circlePlus}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
          placeholder={'Add Contacts'}
          title="Invite people"
        />
        <Spacer height={15} />
        {addedData.map((item, index) => (
          <View key={index}>
            <View style={{...styles.inviteBody}}>
              <View style={{...styles.spaceBetween}}>
                <View style={{...styles.flexRow}}>
                  <Image
                    source={icons.profile1}
                    style={{...styles.imageStyle}}
                  />
                  <Spacer width={10} />
                  <Text style={{...styles.emailFontStyle}}>{item}</Text>
                </View>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => removeItem(index)}>
                  <Image
                    source={icons.crossPink}
                    style={{...styles.iconStyle}}
                  />
                </TouchableOpacity>
              </View>
              <UnderLine width={insets.top + 300} height={1} />
            </View>
          </View>
        ))}

          {/* <PickerButton
            placeholder="Jane Doe"
            title="Invite people (optional)"
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.circlePlus}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          /> */}
          <Text
            style={{
              marginTop: 30,
              fontSize: 28,
              textAlign: 'left',
              color: 'white',
              fontFamily: Fonts.semiBold,
            }}>
            {'Privacy Setting'}
          </Text>

          <Text style={{...AppStyles.h4}}>
            {
              'The appointment will be set as public by default unless the private or hidden option is turned on.'
            }
          </Text>

          <View style={{...styles.spaceBetween, marginTop: 25}}>
            <Text style={{...styles.toggleText}}>{'Private'}</Text>
            <Switch
              trackColor={{false: '#767577', true: theme.darkGreen}}
              thumbColor={isPrivate ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePrivate}
              value={isPrivate}
            />
          </View>
          <UnderLine />
          <View style={{...styles.spaceBetween, marginTop: 25}}>
            <Text style={{...styles.toggleText}}>{'Hidden'}</Text>
            <Switch
              trackColor={{false: '#767577', true: theme.darkGreen}}
              thumbColor={isHidden ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleHidden}
              value={isHidden}
            />
          </View>
          <Spacer height={20} />
          <PrimaryButton
            label={'Create Appointment'}
            onPress={() => navigation.navigate(Routes.Home)}
          />
          <Spacer height={20} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  toggleText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Fonts.regular,
  },
  modalDesign: {
    width: '100%',
    padding: 30,
    height: '39%',
    bottom: -18,
    backgroundColor: 'white',
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 20,
  },
  modalTimeDesign: {
    width: '100%',
    padding: 30,
    height: '28%',
    bottom: -18,
    backgroundColor: 'white',
    position: 'absolute',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 20,
  },
  inviteBody: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    borderColor: 'grey',
    padding: 3,
  },
  imageStyle:{
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emailFontStyle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: 'white',
    alignSelf: 'center',
  },
  iconStyle:{
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
});

export default CreateAppointment;
