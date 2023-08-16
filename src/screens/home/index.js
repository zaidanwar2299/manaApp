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
import React, {useCallback, useState} from 'react';
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
import Fonts from '../../assets/fonts';

const Home = () => {
  const [knobClick, setKnobClick] = useState(false);
  const ITEMS = AgendaItems;

  // const renderKnob = () => (
  //   <TouchableOpacity
  //     activeOpacity={0.6}
  //     onPress={setKnobClick(!knobClick)}
  //     style={{
  //       height: 40,
  //       width: 80,
  //       backgroundColor: theme.secondary,
  //       borderRadius: 20,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     }}>
  //     <View style={{display: 'flex', flexDirection: 'row'}}>
  //       <Text style={{color: 'white'}}>July</Text>
  //       <Spacer width={10} />
  //       <Image
  //         source={icons.upArrow}
  //         resizeMode="contain"
  //         style={{height: 10, width: 10, alignSelf: 'center'}}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // );

  // const renderItem = useCallback(({item}) => {
  //   return <AgendaItems item={item}/>;
  // }, []);

  // Dummy data for agenda items (replace with your actual data)
  // const agendaItems = {
  //   '2023-08-10': [{name: 'Meeting 1'}, {name: 'Event 1'}],
  //   '2023-08-11': [{name: 'Meeting 2'}],
  //   '2023-08-12': [{name: 'Event 2'}],
  // };

  // const agendaItems = [
  //   { title: 'Meeting', time: '2023-08-11T09:30:00' },
  //   { title: 'Lunch', time: '2023-08-11T12:00:00' },
  //   { title: 'Workshop', time: '2023-08-11T14:00:00' },
  //   { title: 'Team Huddle', time: '2023-08-11T10:00:00' },
  //   // Add more items as needed
  // ];

  // const timeBasedData = {
  //   '2023-08-11T09:00:00': [{time: '09:00 AM', event: 'Meeting'}],
  //   '2023-08-11T14:30:00': [{time: '02:30 PM', event: 'Lunch'}],
  //   // Add more entries as needed
  // };

  // const renderItem = (item) => (
  //   <View style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
  //     <Text>{item.time}</Text>
  //     <Text>{item.event}</Text>
  //   </View>
  // );

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
    // dayNamesShort: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };
  LocaleConfig.defaultLocale = 'fr';
  const TimeSlot = ({time}) => {
    return (
      // <View style={{display:"flex", flexDirection:"row"}}>

      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View
          style={{
            // padding: 10,
            color: 'white',
            alignSelf: 'flex-start',
            minWidth: 60,
            marginBottom: 5,
            // height:"auto",
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'flex-start',
              textAlign: 'right',
              // backgroundColor: 'red',
              paddingLeft: 12,
              marginBottom: 10,
              // paddingTop: -10,
              // paddingBottom:10,
              position: 'absolute',
              fontFamily: Fonts.light,
              fontSize: 13,
            }}>{`${time}`}</Text>

          {/* Add additional content for each time slot */}
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {[1, 2, 3, 4, 5, 6, 7].map(index => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log('pressed', index)}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  // borderBottomWidth: 1,
                  // borderRightWidth: 1,
                  // borderLeftWidth: 1,
                  borderWidth: 1,
                  borderColor: '#424652',
                }}></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      // </View>
    );
  };

  const renderEmptyDate = () => (
    <View style={{padding: 10, borderBottomWidth: 1, borderColor: 'gray'}}>
      <Text>No events for this time</Text>
    </View>
  );

  const timeSlots = [];
  // for (let hour = 12; hour <= 24; hour++) {
  //   // timeSlots.push(`${hour}:00 `);
  //   timeSlots.push(moment(hour, 'h a').format('h a'));
  // }
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 || 12; // Convert to 12-hour format
    const ampm = i < 12 ? 'am' : 'pm';
    timeSlots.push(`${hour} ${ampm}`);
  }

  // NEW ONE

  const events = {
    '2023-08-11': [
      {time: '10:00', name: 'Meeting with client'},
      {time: '02:30', name: 'Team presentation'},
      // ... add more events
    ],
  };

  // const renderItem = item => {
  //   // Format the time to AM/PM
  //   const formattedTime = moment(item.time, 'hh:mm A').format('hh:mm A');

  //   return (
  //     <View style={{padding: 10}}>
  //       <Text>{formattedTime}</Text>
  //       <Text>{item.name}</Text>
  //     </View>
  //   );
  // };

  // const data = {
  //   '2023-08-10': [{text: 'Event 1'}, {text: 'Event 2'}],
  //   '2023-08-15': [{text: 'Event 3'}],
  // };
  const [items, setItems] = useState({});

  const renderItem = useCallback(({item}) => {
    return <AgendaItem item={item} />;
  }, []);

  const data = [
    {
      time: '09:00',
      title: 'Event 1',
      description: 'Description for Event 1',
    },
    {
      time: '10:30',
      title: 'Event 2',
      description: 'Description for Event 2',
    },
    {
      time: '12:00',
      title: 'Event 3',
      description: 'Description for Event 3',
    },
    // Add more events as needed
  ];

  const INITIAL_TIME = {hour: 9, minutes: 0};
  const EVENTS = timelineEvents;

  const [state, setState] = useState({
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, e =>
      CalendarUtils?.getCalendarDateString(e.start),
    ),
  });

  // console.log('EVENTS BY DATEEEEEE', state.eventsByDate);

  const marked = {
    [`${getDate(-1)}`]: {marked: true},
    [`${getDate()}`]: {marked: true},
    [`${getDate(1)}`]: {marked: true},
    [`${getDate(2)}`]: {marked: true},
    [`${getDate(4)}`]: {marked: true},
  };

  const onDateChanged = date => {
    setState({currentDate: date});
  };

  const onMonthChange = (month, updateSource) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  // createNewEvent = (timeString, timeObject) => {
  //   const {eventsByDate} = state;
  //   const hourString = `${(timeObject?.hour + 1).toString().padStart(2, '0')}`;
  //   const minutesString = `${timeObject?.minutes.toString().padStart(2, '0')}`;

  //   const newEvent = {
  //     id: 'draft',
  //     start: `${timeString}`,
  //     end: `${timeObject?.date} ${hourString}:${minutesString}:00`,
  //     title: 'New Event',
  //     color: 'white',
  //   };

  //   if (timeObject?.date) {
  //     if (eventsByDate[timeObject?.date]) {
  //       eventsByDate[timeObject?.date] = [
  //         ...eventsByDate[timeObject?.date],
  //         newEvent,
  //       ];
  //       setState({eventsByDate});
  //     } else {
  //       eventsByDate[timeObject?.date] = [newEvent];
  //       setState({eventsByDate: {...eventsByDate}});
  //     }
  //   }
  // };

  // approveNewEvent = (_timeString, timeObject) => {
  //   const {eventsByDate} = state;

  //   Alert.prompt('New Event', 'Enter event title', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {
  //         if (timeObject?.date) {
  //           eventsByDate[timeObject?.date] = filter(
  //             eventsByDate[timeObject?.date],
  //             e => e.id !== 'draft',
  //           );

  //           setState({
  //             eventsByDate,
  //           });
  //         }
  //       },
  //     },
  //     // {
  //     //   text: 'Create',
  //     //   onPress: eventTitle => {
  //     //     if (timeObject?.date) {
  //     //       const draftEvent = find(eventsByDate[timeObject?.date], {id: 'draft'});
  //     //       if (draftEvent) {
  //     //         draftEvent.id = undefined;
  //     //         draftEvent.title = eventTitle ?? 'New Event';
  //     //         draftEvent.color = 'lightgreen';
  //     //         eventsByDate[timeObject?.date] = [...eventsByDate[timeObject?.date]];

  //     //         setState({
  //     //           eventsByDate
  //     //         });
  //     //       }
  //     //     }
  //     //   }
  //     // }
  //   ]);
  // };

  // const allData = {
  //   format24h: true,
  //   // onBackgroundLongPress: createNewEvent,
  //   // onBackgroundLongPressOut: approveNewEvent,
  //   // scrollToFirst: true,
  //   // start: 0,
  //   // end: 24,
  //   unavailableHours: [
  //     {start: 0, end: 6},
  //     {start: 22, end: 24},
  //   ],
  //   overlapEventsSpacing: 8,
  //   rightEdgeSpacing: 24,
  //   backgroundColor: 'red',
  //   // theme: [{backgroundColor:"red",}]
  // };

  const timelineProps = {
    format24h: false,
    start: 0,
    end: 24,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24},
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 10,
    // theme: [{darkTheme,backgroundColor: 'red', display:"none", calendarBackground:"red", timeLineBackground:"red"}],
    theme: {darkTheme},
  };

  const darkTheme = {
    backgroundColor: '#1E1E1E',
    textColor: '#FFFFFF',
    iconColor: '#FF9500',
  };

  const customTheme = {
    // Override the default styles for the calendar component
    'stylesheet.calendar.main': {
      container: {
        // Adjust these values to reduce the space between dates
        paddingHorizontal: 30, // Adjust horizontal spacing
        paddingVertical: 30, // Adjust vertical spacing
      },
    },
  };

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
            <Image
              source={icons.calendar}
              resizeMode="contain"
              style={{height: 23, width: 23, alignSelf: 'center'}}
            />
            <Image
              source={icons.bellIcon}
              resizeMode="contain"
              style={{height: 23, width: 23, alignSelf: 'center'}}
            />
          </View>
        )}
      />

      {/* <Calendar
        theme={{
          calendarBackground: theme.grey800,
          dayTextColor: 'white',
          textSectionTitleColor: 'white',
          monthTextColor: 'white',
        }}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        markedDates={marked}
      /> */}

      {/* <View style={styles.container} ></View> */}

      {/* <CalendarProvider  /> */}
      {/* <ExpandableCalendar 
      /> */}

      {/* <Agenda
        // items={events}
        theme={{
          calendarBackground: theme.grey800,
          dayTextColor: 'white',
          textSectionTitleColor: 'white',
          monthTextColor: 'white',
          textDayStyle:{backgroundColor:"red"},
          // contentStyle:{backgroundColor:"red"}
          // arrowHeight:800
          // textDayHeaderFontSize:8,
          // contentStyle:[{width:20}],
          // textDayStyle:[{width:200}]
        }}
        style={{
          // height: 400,
          width:"100%",
           backgroundColor:"red",
        }}

        hideKnob={false}
        showClosingKnob={true}

        renderEmptyData={() => (
          <ScrollView
            style={{
              flex: 1,
              minHeight: '100%',
              backgroundColor: theme.primary,
            }}>
            {timeSlots.map((time, index) => (
              <TimeSlot key={index} time={time} />
            ))}
          </ScrollView>
        )}
        renderEmptyDate={renderEmptyDate}
        // You can customize other props here
      /> */}
      <CalendarProvider date={new Date()} showTodayButton disabledOpacity={0.6}  >
        <View
          style={{
            // width: '100%',
            // display: 'flex',
            // flex:1,

            // alignSelf: 'center',
            // paddingLeft:25,
            // paddingRight:10
            // paddingHorizontal:10
          }}>
          <ExpandableCalendar
            theme={{
              calendarBackground: theme.primary,
              dayTextColor: 'white',
              textSectionTitleColor: 'white',
              monthTextColor: 'white',
              // stylesheet:{paddingHorizontal:20},
              // textDayStyle:{paddingHorizontal:20}
              // ...customTheme
              // textDayFontSize:13,
              // textDayHeaderFontSize:10,
              // textMonthFontSize:20,
              // contentStyle: {width: '60%'},
              // paddingTop:-30,
            }}
            calendarStyle={{paddingLeft:52, }}
            headerStyle={{paddingLeft:52, marginTop:20}}
            renderHeader={()=> <View />}
            renderArrow={()=> <View />}
            // firstDay={1}
            // markedDates={data}
            // onDayPress={(date) => {
            //   const expanded = { ...items };
            //   expanded[date] = !expanded[date];
            //   setItems(expanded);
            // }}
            items={items}
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            // marginBottom:20,
            // height: '100%',
            backgroundColor: theme.primary,
          }}>
          {timeSlots.map((time, index) => (
            <TimeSlot key={index} time={time} />
          ))}
          <Spacer height={25} />
        </ScrollView>

        {/* <Timeline
        data={data}
        circleSize={20}
        circleColor="rgb(45,156,219)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{ minWidth: 52 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{ color: 'gray' }}
        options={{
          style: { paddingTop: 5 },
        }}
      /> */}
      </CalendarProvider>
      {/* <View>
       
       </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
