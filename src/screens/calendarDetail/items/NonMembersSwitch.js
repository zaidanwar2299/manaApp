import {View, Text, Switch, StyleSheet} from 'react-native';
import React from 'react';
import UnderLine from '../../../components/Underline';
import Fonts from '../../../assets/fonts';
import theme from '../../../common/theme';

const NonMembersSwitch = ({togglePrivate, isPrivate, toggleHidden, isHidden}) => {
  return (
    <View>
      <Text style={{...styles.membersFont}}>{'Non-members can see'}</Text>

      <View style={{...styles.spacebetween, marginTop: 40}}>
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
      <View style={{...styles.spacebetween, marginTop: 25}}>
        <Text style={{...styles.toggleText}}>{'My private events'}</Text>
        <Switch
          trackColor={{false: '#767577', true: theme.blue}}
          thumbColor={isHidden ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHidden}
          value={toggleHidden}
        />
      </View>
      <UnderLine />
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
    toggleText: {
      fontSize: 16,
      color: 'white',
      fontFamily: Fonts.regular,
    },
    membersFont: {
      fontSize: 25,
      fontFamily: Fonts.bold,
      color: 'white',
    },
  });
export default NonMembersSwitch;
