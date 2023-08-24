import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../../../components/views/header';
import Fonts from '../../../../assets/fonts';
import icons from '../../../../assets/icons';
import {Spacer} from '../../../../components/Spacer';
import theme from '../../../../common/theme';
import UnderLine from '../../../../components/Underline';
import {AppointmentCalendar} from '../../../../common/constants';

const ContactDetail = () => {
  return (
    <View style={{flex: 1}}>
      <Header
        title={'Mario Mourad'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
        renderRightItem={() => (
          <Image
            source={icons.calendarPlus}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              marginRight: 5,
            }}
            tintColor={'white'}
          />
        )}
      />
      <UnderLine />
      <Spacer height={15} />
      <ScrollView>
        <Image
          source={icons.profilePhoto}
          style={{
            height: 95,
            width: 95,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <View style={{padding: 20, marginTop: 20}}>
          <Text
            style={{fontSize: 25, fontFamily: Fonts.semiBold, color: 'white'}}>
            {'Common calendars'}
          </Text>

          {AppointmentCalendar.map((item, index) => (
            <View
              key={index}
              style={{...styles.appointmentBody, marginTop: 20}}>
              <View style={{paddingHorizontal: 20, ...styles.spaceBetween}}>
                <View style={{...styles.flexRow}}>
                  <View style={{...styles.dot, backgroundColor: item.color}} />
                  <Text style={[styles.aptText]}>{item.name}</Text>
                </View>

                <Text
                  style={{
                    color: theme.grey100,
                  }}>{`${item.members} members`}</Text>
              </View>
            </View>
          ))}

          {/* <View style={{...styles.appointmentBody}}>
            <View style={{paddingHorizontal: 20, ...styles.spaceBetween}}>
              <View style={{...styles.flexRow}}>
                <View style={{...styles.dot, backgroundColor: theme.green}} />
                <Text style={[styles.aptText]}>{'Travel Calendar'}</Text>
              </View>

              <Text style={{color: theme.grey100}}>{'20 members'}</Text>
            </View>
          </View> */}

          {/* UpComing Event */}

          <View style={[styles.eventHeader, styles.flexRow]}>
            <Text style={{...styles.headerEvent}}>{'Upcoming events'}</Text>
            <Image
              source={icons.calendarPlus}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </View>

          {[1, 2].map(index => (
            <View key={index}>
              <Text style={{marginTop: 20, color: theme.grey100}}>
                {'Jun 25'}
              </Text>
              <View style={[styles.eventBody]}>
                <View style={{...styles.spaceBetween}}>
                  <Text style={{...styles.fontStyle}}>{'Meeting Mario'}</Text>
                  <Text style={{...styles.timeStyle}}>
                    {'8:00 am - 9:00pm'}
                  </Text>
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

          {/* Past Event */}

          <View
            style={{...styles.eventHeader, ...styles.flexRow, marginTop: 40}}>
            <Text style={{...styles.headerEvent}}>{'Past events'}</Text>
            <Image
              source={icons.calendarPlus}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </View>

          {[1, 2].map(index => (
            <View key={index}>
              <Text style={{marginTop: 20, color: theme.grey100}}>
                {'Jun 25'}
              </Text>
              <View style={[styles.eventBody]}>
                <View style={{...styles.spaceBetween}}>
                  <Text style={{...styles.fontStyle}}>{'Meeting Mario'}</Text>
                  <Text style={{...styles.timeStyle}}>
                    {'8:00 am - 9:00pm'}
                  </Text>
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
        <Spacer height={10} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  fontStyle: {
    fontSize: 17,
    fontFamily: Fonts.regular,
    color: 'white',
  },
  appointmentBody: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: theme.secondary,
    borderRadius: 10,
    marginBottom: 20,
  },
  aptText: {
    color: 'white',
    fontFamily: Fonts.regular,
    fontSize: 15,
    alignSelf: 'center',
  },
  dot: {
    height: 12,
    width: 12,
    // backgroundColor: theme.pink,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
  eventHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  eventBody: {
    height: 130,
    marginTop: 20,
    width: '100%',
    backgroundColor: theme.secondary,
    borderRadius: 10,
    padding: 20,
  },
  bodyText: {
    color: 'white',
    fontSize: 13,
    fontFamily: Fonts.light,
    marginLeft: 10,
    alignSelf: 'center',
  },
  headerEvent: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: 'white',
  },
  timeStyle: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
});

export default ContactDetail;
