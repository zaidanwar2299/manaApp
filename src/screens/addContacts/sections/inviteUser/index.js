import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Header from '../../../../components/views/header';
import Fonts from '../../../../assets/fonts';
import UnderLine from '../../../../components/Underline';
import theme from '../../../../common/theme';
import PrimaryInput from '../../../../components/inputs/primaryInput';
import {Spacer} from '../../../../components/Spacer';
import icons from '../../../../assets/icons';
import PrimaryButton from '../../../../components/buttons/primaryButton';
import {AppStyles} from '../../../../common/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomModal from '../../../../components/customModal';

const InviteUser = () => {
  const insets = useSafeAreaInsets();

  const [inputData, setInputData] = useState('');
  const [addedData, setAddedData] = useState([]);

  const handleAddData = () => {
    if (inputData.trim() !== '') {
      setAddedData([...addedData, inputData]);
      setInputData('');
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Invite Users'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
      />
      <UnderLine />
      <ScrollView>
        <Spacer height={20} />
        <View style={{padding: 15}}>
          <Text style={{...styles.fontStyle}}>{'Meaasge'}</Text>
          <TextInput
            placeholder={'Write here ......'}
            placeholderTextColor={theme.grey200}
            style={{...styles.textInput}}
            //   value={state.comment}
            //   onChangeText={text => {
            //     setState({comment: text});
            //   }}
            multiline
          />
          <Spacer height={20} />
          <Text style={{...styles.fontStyle}}>{'Email'}</Text>

          {addedData.map((item, index) => (
            <View key={index}>
              <View style={{...styles.emailBody}}>
                <Text style={{...styles.emailFontStyle}}>{item}</Text>
              </View>
            </View>
          ))}
          <Spacer height={20} />

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
            placeholder={'Enter one more email'}
          />
          <Spacer height={20} />
          <PrimaryButton
            onPress={() => modalToggle()}
            label={'Send Invitation'}
            labelStyle={{fontSize: 15, fontFamily: Fonts.bold}}
            innerContainerStyle={{height: 55}}
          />
        </View>
      </ScrollView>
      {/* <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        // onRequestClose={() => {
        //   // setModalVisible(!modalVisible);
        //   // setShowTimePicker(false);
        //   modalToggle
        // }}
        // swipeDirection={['down']}
        // onSwipeComplete={()=>setModalVisible(false)}
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
              <Text style={{...styles.modalFontStyle}}>{'Success!'}</Text>
              <Spacer height={15} />
              <Text
                style={{
                  ...styles.fontStyle,
                  alignSelf: 'center',
                  fontFamily: Fonts.regular,
                }}>
                {'Your invitation was successfully sent.'}
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
      </Modal> */}

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
                <Text style={{...styles.modalFontStyle}}>{'Success!'}</Text>
                <Spacer height={15} />
                <Text
                  style={{
                    ...styles.fontStyle,
                    alignSelf: 'center',
                    fontFamily: Fonts.regular,
                  }}>
                  {'Your invitation was successfully sent.'}
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
        }></CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: theme.grey100,
  },
  modalFontStyle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: 'white',
    alignSelf: 'center',
  },
  textInput: {
    height: 90,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: 'white',
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: theme.secondary,
    textAlignVertical: 'top',
    paddingLeft: 20,
    paddingTop: 20,
  },
  emailBody: {
    width: '100%',
    height: 60,
    backgroundColor: theme.secondary,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 15,
    padding: 20,
  },
  emailFontStyle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  backDrop: {
    opacity: 0.9,
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
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

export default InviteUser;
