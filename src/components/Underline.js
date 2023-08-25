import {View, Text} from 'react-native';
import React from 'react';
import {Spacer} from './Spacer';
import theme from '../common/theme';

const UnderLine = ({backgroundColor, width}) => {
  return (
    <>
      <Spacer height={10} />
      <View
        style={{
          height: 0.8,
          width: width || '100%',
          backgroundColor: backgroundColor || theme.secondary,
          alignSelf: 'center',
        }}></View>
    </>
  );
};

export default UnderLine;
