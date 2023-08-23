import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Fonts from '../../assets/fonts';
import {Ionicons} from '../../assets/vectorIcons';
// import BusinessProfile from '../../screens/businessProfile';
import Home from '../../screens/home';
// import Messages from '../../screens/messages';
// import Notifications from '../../screens/notifications';
// import Search from '../../screens/search';
// import { openDrawer } from '../navigation.utils';
import Routes from '../routes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../../common/theme';
import icons from '../../assets/icons';
import ProfileScreen from '../../screens/ProfileScreen';
import {Spacer} from '../../components/Spacer';
import Contacts from '../../screens/contacts';
import Activity from '../../screens/activity';
import CreateAppointment from '../../screens/createAppointment';

const BottomTab = createBottomTabNavigator();

const BottomTabStack = () => {
  const insets = useSafeAreaInsets();

  const [focusItem, setFoucsItem] = useState();

  return (
    <BottomTab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarButton: props => {
          let tabIcon = '';
          let tabLabel = '';

          if (route.name == Routes.Home) {
            tabIcon = icons.home;
            tabLabel = 'Home';
          } else if (route.name == Routes.Contacts) {
            tabIcon = icons.contacts;
            tabLabel = 'Contacts';
          } else if (route.name == Routes.CreateAppointment) {
            tabIcon =
              focusItem || route.name == Routes.CreateAppointment
                ? icons.menuIcon
                : icons.menuIconWhite;
            // console.log('Very Very Focused', focusItem);
            tabLabel = '';
          } else if (route.name == Routes.Activity) {
            tabIcon = icons.activity;
            tabLabel = 'Activity';
          } else if (route.name == Routes.ProfileScreen) {
            tabIcon = icons.profileUser;
            tabLabel = 'Profile';
          }

          const isFocused = () => {
            return (
              route.name ==
              navigation.getState().routes[navigation.getState().index].name
            );
          };
          useEffect(() => {
            setFoucsItem(isFocused());
          }, []);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              {...props}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexGrow: 1,
                height: 90,
                justifyContent: 'center',
                backgroundColor: theme.grey800,
                // backgroundColor: 'red',
                width: 10,
              }}>
              {/* <Ionicons
                    name={tabIcon}
                    size={24}
                    color={isFocused() || route.name == Routes.DrawerMenu ? "black" : "#A1A1AF"}
                    style={{
                        marginRight: 5
                    }}
                /> */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  //   backgroundColor:"pink"
                  paddingRight: route.name == Routes.CreateAppointment ? 6 : 0,
                  paddingTop: route.name == Routes.CreateAppointment ? 12 : 0,
                }}>
                <Image
                  source={tabIcon}
                  resizeMode="contain"
                  style={{
                    height:
                      route.name == Routes.Home
                        ? 30
                        : route.name == Routes.CreateAppointment
                        ? 43
                        : 25,
                    width:
                      route.name == Routes.Home
                        ? 30
                        : route.name == Routes.CreateAppointment
                        ? 43
                        : 25,
                    tintColor:
                      route.name == Routes.CreateAppointment
                        ? null
                        : isFocused() || route.name == Routes.BottomTabStack
                        ? 'white'
                        : theme.grey200,
                    // backgroundColor:"pink"
                  }}
                />
                <Spacer height={5} />
                {/* {isFocused() && ( */}
                <Text
                  style={{
                    color: theme.grey200,
                    fontFamily: Fonts.semiBold,
                    fontSize: 10,
                  }}>
                  {tabLabel}
                </Text>
                {/* )} */}
              </View>
            </TouchableOpacity>
          );
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingBottom: insets.bottom,
          minHeight: 90,
        },
      })}>
      <BottomTab.Screen name={Routes.Home} component={Home} />
      <BottomTab.Screen name={Routes.Contacts} component={Contacts} />
      <BottomTab.Screen
        name={Routes.CreateAppointment}
        component={CreateAppointment}
      />
      <BottomTab.Screen name={Routes.Activity} component={Activity} />
      <BottomTab.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabStack;
