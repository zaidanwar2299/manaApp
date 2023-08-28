import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/views/header';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import PrimaryInput from '../../components/inputs/primaryInput';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';
import theme from '../../common/theme';
import PrimaryButton from '../../components/buttons/primaryButton';
import { navigate } from '../../navigation/navigation.utils';
import Routes from '../../navigation/routes';

const CreateCalendarGroup = () => {
  const insets = useSafeAreaInsets();

  const [inputData, setInputData] = useState('');
  const [addedData, setAddedData] = useState([]);

  // Toggle Switch
  const [isPrivate, setIsPrivate] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const togglePrivate = () => setIsPrivate(previousState => !previousState);
  const toggleHidden = () => setIsHidden(previousState => !previousState);

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
  return (
    <View style={{flex:1}} >
      <Header
        title={'Create Calendar Group'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
      />
      <UnderLine />
      <ScrollView>
      <View style={{padding: 15}}>
        <PrimaryInput
          title="Calendar group name"
          placeholder="Travel calendar"
        />
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
        <Spacer height={20} />
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Text style={{...styles.fontStyle}}>{'Non-members can see'}</Text>

        <View style={{...styles.spaceBetween, marginTop: 40}}>
          <Text style={{...styles.toggleText}}>{'My public events'}</Text>
          <Switch
            trackColor={{false: '#767577', true: theme.blue}}
            thumbColor={isPrivate ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={togglePrivate}
            value={isPrivate}
          />
        </View>
        <UnderLine />
        <View style={{...styles.spaceBetween, marginTop: 25}}>
          <Text style={{...styles.toggleText}}>{'My private events'}</Text>
          <Switch
            trackColor={{false: '#767577', true: theme.blue}}
            thumbColor={isHidden ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleHidden}
            value={isHidden}
          />
        </View>
        <UnderLine />
      </View>

      <PrimaryButton
      onPress={()=> {
         navigate(Routes.CalendarGroup,{
          defaultModal: true
         })
        }}
        containerStyle={{padding: 15, marginTop: 30, marginBottom:20}}
        label={'Create Group'}
      />
    </ScrollView>
    </View>
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
  fontStyle: {
    fontSize: 25,
    fontFamily: Fonts.bold,
    color: 'white',
  },
  emailFontStyle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: 'white',
    alignSelf: 'center',
  },
  inviteBody: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    borderColor: 'grey',
    padding: 3,
  },
  toggleText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Fonts.regular,
  },
  imageStyle:{
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  iconStyle:{
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  
});

export default CreateCalendarGroup;
