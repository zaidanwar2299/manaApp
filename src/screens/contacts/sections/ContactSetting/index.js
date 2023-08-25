import {View, Text, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/views/header';
import Fonts from '../../../../assets/fonts';
import UnderLine from '../../../../components/Underline';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../../../../common/theme';
import BottomTabStack from '../../../../navigation/stacks/BottomTabStack';

const ContactSetting = () => {
  const insets = useSafeAreaInsets();

  const [isPrivate, setIsPrivate] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const togglePrivate = () => setIsPrivate(previousState => !previousState);
  const toggleHidden = () => setIsHidden(previousState => !previousState);
  return (
    <View>
      <Header
        title={'Contact Settings'}
        titleStyle={{fontSize: 22, fontFamily: Fonts.semiBold}}
        titleProps={{fontSize: 30}}
      />
      <UnderLine width={insets.right + 400} />

      <View style={{padding: 20, marginTop: 10}}>
        <Text style={{fontSize: 28, fontFamily: Fonts.bold, color: 'white'}}>
          {'New contacts can see'}
        </Text>

        <View style={{...styles.spaceBetween, marginTop: 40}}>
          <Text style={{...styles.toggleText}}>{'My public events'}</Text>
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
          <Text style={{...styles.toggleText}}>{'My private events'}</Text>
          <Switch
            trackColor={{false: '#767577', true: theme.darkGreen}}
            thumbColor={isHidden ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleHidden}
            value={isHidden}
          />
        </View>
        <UnderLine />
      </View>
    </View>
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
});
export default ContactSetting;
