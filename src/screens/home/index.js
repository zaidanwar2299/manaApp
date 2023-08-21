import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Agenda,
  AgendaList,
  Calendar,
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  LocaleConfig,
  Timeline,
  TimelineList,
} from 'react-native-calendars';
import Header from '../../components/views/header';
import theme from '../../common/theme';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import {AgendaItems} from './items/AgendaItems';
import AgendaItem from './items/AgendaItem';
import {timelineEvents, getDate} from './items/timelineEvents';
import Modal from 'react-native-modal';
import Fonts from '../../assets/fonts';
import {AppStyles, Typo} from '../../common/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PrimaryButton from '../../components/buttons/primaryButton';
import {Swipeable} from 'react-native-gesture-handler';
import CalendarArray from '../../utils/CalendarArray';
import {useNavigation} from '@react-navigation/native';
import Routes from '../../navigation/routes';

const Home = () => {
  const navigation = useNavigation();

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };
  LocaleConfig.defaultLocale = 'fr';

  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [calIndex, setCalIndex] = useState();

  const modalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const [modalAppointVisible, setModalAppointVisible] = useState(false);

  const appointToggle = () => {
    setModalAppointVisible(!modalAppointVisible);
  };

  // const calendarRow = (day) => {

  //   if(day === 'sunday') {
  //     setCalIndex(0)
  //     console.log("SUNDAY")
  //   } else if (day === 'monday') {
  //     setCalIndex(1)
  //     console.log("MONDAY")
  //   }
  //   return
  // }

  // useEffect(() => {
  //   calendarRow()
  // },[calIndex])

  console.log('CAAALLLLLLINNININIDNIE', calIndex);

  const TimeSlot = ({time, newIndex}) => {
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={[styles.timeBody]}>
          <Text style={[styles.timeList]}>{`${time}`}</Text>
        </View>
        <View style={[styles.flexRow]}>
          {[0, 1, 2, 3, 4, 5, 6].map(index => (
            <TouchableOpacity key={index} onPress={() => modalToggle()}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderWidth: 1,
                  borderColor: '#424652',
                }}>
                {/* <TouchableOpacity> */}
                {CalendarArray.map((item, _index) => {
                  const Time = item.time;
                  const firstTwoAlphabets = Time.slice(0, 2);
                  // console.log('firstTwoAlphabets', firstTwoAlphabets);
                  // const words = item.dat;
                  // setCalIndex()
                  // calendarRow(item.day)
                  // const words = item.date.split(' ');
                  // const firstWord = words[0];
                  // console.log('firstWord', firstWord);
                  return index == 4 && newIndex == firstTwoAlphabets ? (
                    <View style={styles.profile} key={_index}>
                      <View style={styles.profileBadge} />
                      <Image
                        source={icons.calendarPic}
                        style={{
                          height: 34,
                          width: 34,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ) : null;
                })}
              </View>
            </TouchableOpacity>
          ))}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setShowTimePicker(false);
            }}
            swipeDirection={['down']}
            onSwipeComplete={modalToggle}
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
                <Text
                  style={{
                    ...AppStyles.h11,
                    fontSize: 28,
                    fontFamily: Fonts.bold,
                  }}>
                  {'Meeting Mario'}
                </Text>
                <View>
                  <Text style={{...AppStyles.h4, fontFamily: Fonts.thin}}>
                    {'Saturday, 2 Jun'}
                  </Text>
                  <Text style={{...AppStyles.h4, fontFamily: Fonts.thin}}>
                    {'8:00 am - 9:00 am'}
                  </Text>
                </View>
                <View style={{padding: 20}}>
                  <View
                    style={{
                      ...styles.spaceBetween,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        ...styles.flexRow,
                        alignItems: 'center ',
                      }}>
                      <Image
                        source={icons.calendarPic}
                        style={{height: 30, width: 30, resizeMode: 'contain'}}
                      />
                      <Text
                        style={{
                          color: theme.grey200,
                          alignSelf: 'center',
                          marginLeft: 6,
                        }}>
                        {'Mario Mourad'}
                      </Text>
                    </View>
                    <View style={{...styles.flexRow}}>
                      <Image
                        source={icons.locationWhite}
                        style={{height: 16, width: 16, resizeMode: 'contain'}}
                      />
                      <Text
                        style={{
                          ...styles.locationText,
                        }}>
                        {'JFK Airport'}
                      </Text>
                    </View>
                  </View>
                  <Spacer height={20} />
                  <View>
                    <Text
                      style={{color: theme.grey100, fontFamily: Fonts.bold}}>
                      {'Notes:'}
                    </Text>
                    <Text
                      style={{
                        color: theme.grey200,
                        fontSize: 13,
                        marginTop: 10,
                      }}>
                      {
                        'Arrive at the airport ahead of time. Discuss the purpose of visit, whether it is for business, vacation, or any other reason.'
                      }
                    </Text>
                  </View>
                  <Spacer height={25} />
                  <PrimaryButton
                    labelStyle={{fontSize: 15}}
                    label={'Edit Appointment'}
                    onPress={() => {
                      navigation.navigate(Routes.CreateAppointment);
                      modalToggle();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };

  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 || 12; // Convert to 12-hour format
    const ampm = i < 12 ? 'am' : 'pm';
    timeSlots.push(`${hour} ${ampm}`);
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.grey800}}>
      <Header
        containerStyle={{
          alignSelf: 'center',
          width: widthPercentageToDP(95),
        }}
        showBack={false}
        renderLeftItem={() => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              height: 40,
              width: 80,
              backgroundColor: theme.secondary,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'white'}}>July</Text>
              <Spacer width={10} />
              <Image
                source={icons.upArrow}
                resizeMode="contain"
                style={{height: 10, width: 10, alignSelf: 'center'}}
              />
            </View>
          </TouchableOpacity>
        )}
        renderRightItem={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 110,
            }}>
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{height: 23, width: 23, alignSelf: 'center'}}
            />
            <TouchableOpacity onPress={appointToggle}>
              <Image
                source={icons.calendar}
                resizeMode="contain"
                style={{height: 23, width: 23, alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Image
              source={icons.bellIcon}
              resizeMode="contain"
              style={{height: 23, width: 23, alignSelf: 'center'}}
            />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAppointVisible}
        onRequestClose={() => {
          setModalAppointVisible(!modalAppointVisible);
        }}
        swipeDirection={['down']}
        onSwipeComplete={appointToggle}
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
            <Text
              style={{
                ...AppStyles.h11,
                fontSize: 28,
                fontFamily: Fonts.bold,
              }}>
              {'Show Appointments'}
            </Text>
            <View style={{marginTop: 20}}></View>
            <View style={{...styles.appointmentBody}}>
              <View style={{paddingHorizontal: 20, ...styles.spaceBetween}}>
                <View style={{...styles.flexRow}}>
                  <View style={[styles.dot]} />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: Fonts.regular,
                      fontSize: 15,
                    }}>
                    {'Work Calendar'}
                  </Text>
                </View>

                <View>
                  <Text>{'Check'}</Text>
                </View>
              </View>
            </View>
            <Spacer height={20} />
            <View style={{...styles.appointmentBody}}>
              <View style={{paddingHorizontal: 20, ...styles.spaceBetween}}>
                <View style={{...styles.flexRow}}>
                  <View style={{...styles.dot, backgroundColor: theme.green}} />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: Fonts.regular,
                      fontSize: 15,
                    }}>
                    {'Travel Calendar'}
                  </Text>
                </View>

                <View>
                  <Text>{'Check'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CalendarProvider date={new Date()} showTodayButton disabledOpacity={0.6}>
        <View>
          <ExpandableCalendar
            theme={{
              calendarBackground: theme.primary,
              dayTextColor: 'white',
              textSectionTitleColor: 'white',
              monthTextColor: 'white',
            }}
            calendarStyle={{paddingLeft: 52}}
            headerStyle={{paddingLeft: 52, marginTop: 20}}
            renderHeader={() => <View />}
            renderArrow={() => <View />}
            // firstDay={1}
            // markedDates={data}
            // onDayPress={(date) => {
            //   const expanded = { ...items };
            //   expanded[date] = !expanded[date];
            //   setItems(expanded);
            // }}
            // items={items}
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: theme.primary,
          }}>
          {timeSlots.map((time, index) => (
            <TimeSlot key={index} time={time} newIndex={index} />
            // setMainIndex(index)
          ))}
          <Spacer height={25} />
        </ScrollView>
      </CalendarProvider>
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
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  timeList: {
    color: 'white',
    alignSelf: 'flex-start',
    textAlign: 'right',
    paddingLeft: 12,
    marginBottom: 10,
    position: 'absolute',
    fontFamily: Fonts.light,
    fontSize: 13,
  },
  timeBody: {
    color: 'white',
    alignSelf: 'flex-start',
    minWidth: 60,
    marginBottom: 5,
  },
  profile: {
    backgroundColor: theme.greyCalendar,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBadge: {
    borderBottomWidth: 13,
    borderBottomColor: theme.blue, // Change this to your desired color
    borderLeftWidth: 13,
    borderLeftColor: 'transparent',
    zIndex: 1,
    right: 0,
    marginLeft: 25,
    position: 'absolute',
    top: 0,
    transform: [{rotate: '270deg'}],
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
    height: '50%',
    bottom: -45,
    // backgroundColor: 'white',
    position: 'absolute',
    paddingBottom: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
  appointmentBody: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: theme.secondary,
    borderRadius: 15,
  },
  dot: {
    height: 12,
    width: 12,
    backgroundColor: theme.pink,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default Home;

{
  /* Custom Agenda Screnn */
}
{
  /* <Agenda
        items={events}
        theme={{
          calendarBackground: theme.grey800,
          dayTextColor: 'white',
          textSectionTitleColor: 'white',
          monthTextColor: 'white',
        }}
        hideKnob={false}
        showClosingKnob={true}
        renderItem={(item) => (
          <View style={styles.itemContainer}>
            <Text>{item.time}</Text>
          </View>
        )}
        // renderItem={renderItem}
        renderEmptyData={() => (
          <ScrollView
            style={{
              flex: 1,
              minHeight: '100%',
              backgroundColor: theme.primary,
            }}>
            {timeSlots.map(time => (
              <TimeSlot key={time} time={time} />
            ))}
          </ScrollView>
        )}
        renderEmptyDate={renderEmptyDate}
        // You can customize other props here
      /> */
}

// Documentation Calendar Provider
{
  /* <CalendarProvider
        date={new Date()}
        // date={ITEMS[1]?.title}
        showTodayButton
        disabledOpacity={0.6}
        dayComponent={() => <Text style={{ color: 'black' }}>HH:mm</Text>}
      >
        <ExpandableCalendar
          theme={{
            calendarBackground: theme.grey800,
            dayTextColor: 'white',
            textSectionTitleColor: 'white',
            monthTextColor: 'white',
          }}
          firstDay={1}
          markedDates={data}
          onDayPress={(date) => {
            const expanded = { ...items };
            expanded[date] = !expanded[date];
            setItems(expanded);
          }}
          items={items}
        />
        <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        disableIntervalMomentum
        // items={events}
        theme={{
          calendarBackground: theme.grey800,
          dayTextColor: 'white',
          textSectionTitleColor: 'white',
          monthTextColor: 'white',
        }}
      />
      </CalendarProvider> */
}

// const data = [
//   {
//     time: '09:00',
//     title: 'Event 1',
//     description: 'Description for Event 1',
//   },
//   {
//     time: '10:30',
//     title: 'Event 2',
//     description: 'Description for Event 2',
//   },
//   {
//     time: '12:00',
//     title: 'Event 3',
//     description: 'Description for Event 3',
//   },
//   // Add more events as needed
// ];
