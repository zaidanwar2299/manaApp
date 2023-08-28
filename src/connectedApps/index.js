import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/views/header';
import Fonts from '../assets/fonts';
import UnderLine from '../components/Underline';
import theme from '../common/theme';
import {linked, unlinked} from '../common/constants';
import PrimaryButton from '../components/buttons/primaryButton';
import {Spacer} from '../components/Spacer';

const ConnectedApps = () => {
  return (
    <View>
      <Header
        title={'Connected Apps'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
      />
      <UnderLine />
      <View style={{padding: 21}}>
        <Text style={{...styles.fontStyle}}>
          {
            'You can connect SoCal to other apps for syncing your calendar with these apps. This is safe and you’ll be able to set the privacy settings for every event.'
          }
        </Text>
        <UnderLine />

        {unlinked.map(item => (
          <View>
            <PrimaryButton
              label={item.name}
              labelStyle={{color: 'white', fontSize:14}}
              innerContainerStyle={{
                backgroundColor: theme.pink,
                borderWidth: 0,
                marginTop:10
              }}
            />
            {/* <Spacer height={10} /> */}
          </View>
        ))}

        <UnderLine />
        <Spacer height={10} />
        {linked.map(item => (
          <View>
            <PrimaryButton
              label={item.name}
              labelStyle={{color: 'white', fontSize:14}}
              innerContainerStyle={{
                backgroundColor: theme.blue,
                borderWidth: 0,
              }}
            />
            <Spacer height={10} />
          </View>
        ))}
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  fontStyle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: theme.grey100,
  },
});

export default ConnectedApps;
