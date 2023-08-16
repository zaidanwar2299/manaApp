import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import PrimaryInput from '../../components/inputs/primaryInput';
import {Spacer} from '../../components/Spacer';
import Header from '../../components/views/header';
import {AppStyles, Typo} from '../../common/styles';
import Fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import PickerButton from '../../components/pickers/primaryPicker/items/pickerButton';
import theme from '../../common/theme';
import UnderLine from '../../components/Underline';
import PrimaryButton from '../../components/buttons/primaryButton';

const CreateAppointment = () => {


  const [isPrivate, setIsPrivate] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const togglePrivate = () => setIsPrivate(previousState => !previousState);
  const toggleHidden = () => setIsHidden(previousState => !previousState);
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
            placeholder="Saturday, 2 Jun"
            title="Date"
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.calendarBlue}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />

          <PickerButton
            placeholder="Select location"
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
            placeholder="6:00 am - 7:00 am"
            title="Time"
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.clock}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />

          <PickerButton
            placeholder="Jane Doe"
            title="Invite people (optional)"
            showDownIcon={false}
            renderRightItem={() => (
              <Image
                source={icons.circlePlus}
                style={{...AppStyles.pickerIconStyle}}
              />
            )}
          />
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
          <PrimaryButton label={'Create Appointment'} />
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
  toggleText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Fonts.regular,
  },
});

export default CreateAppointment;
