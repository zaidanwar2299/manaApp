import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/views/header';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import PrimaryInput from '../../components/inputs/primaryInput';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';

const CreateCalendarGroup = () => {
  const [inputData, setInputData] = useState('');
  const [addedData, setAddedData] = useState([]);

  const handleAddData = () => {
    if (inputData.trim() !== '') {
      setAddedData([...addedData, inputData]);
      setInputData('');
    }
  };
  return (
    <View>
      <Header
        title={'Create Calendar Group'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
      />
      <UnderLine />
      <View style={{padding: 15}}>
        <PrimaryInput
          title="Calendar group name"
          placeholder="Travel calendar"
        />
        <PrimaryInput title="Notes (optional)" placeholder="Enter a note" />

        <PrimaryInput
          value={inputData}
          // onChangeText={text => setInputData(text)}
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
      </View>
    </View>
  );
};

export default CreateCalendarGroup;
