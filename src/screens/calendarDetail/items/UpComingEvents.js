import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Spacer} from '../../../components/Spacer';
import theme from '../../../common/theme';
import icons from '../../../assets/icons';
import UnderLine from '../../../components/Underline';
import Fonts from '../../../assets/fonts';

const UpComingEvents = () => {
  return (
    <View>
      <Spacer height={20} />
      <Text style={{...styles.headerEvent}}>{'Upcoming events'}</Text>
      {[1].map(index => (
        <View key={index}>
          <Text style={{marginTop: 20, color: theme.grey100}}>{'Jun 25'}</Text>
          <View style={[styles.eventBody]}>
            <View style={{...styles.spacebetween}}>
              <Text style={{...styles.fontStyle}}>{'Meeting Mario'}</Text>
              <Text style={{...styles.timeStyle}}>{'8:00 am - 9:00pm'}</Text>
            </View>
            <Spacer height={5} />
            <UnderLine backgroundColor={theme.greyCalendar} />
            <View style={{...styles.flexRow, paddingVertical: 15}}>
              <Image
                source={icons.profilePhoto}
                style={{height: 35, width: 35, resizeMode: 'contain'}}
              />
              <Text style={{...styles.bodyText}}>{'Mario Mourad'}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: theme.grey100,
  },
  headerEvent: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: 'white',
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
  eventBody: {
    height: 130,
    marginTop: 20,
    width: '100%',
    backgroundColor: theme.secondary,
    borderRadius: 10,
    padding: 20,
  },
  timeStyle: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
  bodyText: {
    color: 'white',
    fontSize: 13,
    fontFamily: Fonts.light,
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default UpComingEvents;
