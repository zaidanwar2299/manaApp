import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/views/header';
import icons from '../../assets/icons';
import Fonts from '../../assets/fonts';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import {ProfileList, calendarList} from '../../common/constants';
import Routes from '../../navigation/routes';
import { navigate } from '../../navigation/navigation.utils';

const CalendarGroup = () => {
  return (
    <View style={{flex:1}} >
      <Header
        title={'My Calendar Group'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
        renderRightItem={() => (
          <TouchableOpacity onPress={() => navigate(Routes.CreateCalendarGroup)}>
            <Image
              source={icons.circlePlus}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginRight: 5,
              }}
              tintColor={'white'}
            />
          </TouchableOpacity>
        )}
      />
      <UnderLine />
      <ScrollView>
      <View style={{padding: 20}}>
        {calendarList.map((item, index) => (
          <View
            key={index}
            style={{
              width: '100%',
              height: item.members <= 0 ? 80 : 110,
              backgroundColor: theme.secondary,
              borderRadius: 10,
              padding: 15,
              paddingLeft: 17,
              marginTop: 20,
            }}>
            <View style={{...styles.spacebetween}}>
              <View style={{...styles.flexRow}}>
                <View style={{...styles.dot, backgroundColor: item.color}} />
                <Text style={{...styles.fontStyleBody, maxWidth:200}}>{item.name}</Text>
              </View>
              <Text
                style={{...styles.fontStyle}}>{`${item.members} Members`}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                height: '70%',
                flexDirection: 'row',
                // backgroundColor:"red",
                alignSelf: 'flex-end',
                // width: 40,
              }}>
              {item.members > 0 ? (
                <>
                  {ProfileList.map((item, index) => (
                    <Image
                      key={index}
                      source={item.image}
                      style={{
                        height: 35,
                        width: 35,
                        resizeMode: 'cover',
                        marginLeft: -10,
                      }}
                    />
                  ))}
                </>
              ) : null}
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: theme.grey100,
  },
  fontStyleBody: {
    fontSize: 18,
    fontFamily: Fonts.regular,
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
  modalFontStyle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: theme.grey100,
    alignSelf: 'center',
  },
  headerFontStyle: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    color: 'white',
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
});

export default CalendarGroup;
