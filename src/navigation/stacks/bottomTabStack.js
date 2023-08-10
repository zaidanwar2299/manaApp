import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import Fonts from '../../assets/fonts';
import { Ionicons } from "../../assets/vectorIcons";
// import BusinessProfile from '../../screens/businessProfile';
import Home from '../../screens/home';
// import Messages from '../../screens/messages';
// import Notifications from '../../screens/notifications';
// import Search from '../../screens/search';
// import { openDrawer } from '../navigation.utils';
import Routes from '../routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Login from '../../screens/auth/login';
import Register from '../../screens/auth/register';
import theme from '../../common/theme';
import icons from '../../assets/icons';
import ProfileScreen from '../../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabStack = () => {
const insets  = useSafeAreaInsets()

    return (
        <BottomTab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarButton: (props) => {
                    let tabIcon = ""
                    let tabLabel = ""

                    if (route.name == Routes.Home) {
                        tabIcon = <Image source={icons.home} />
                        tabLabel = "Home"
                    } else if (route.name == Routes.Login) {
                        // tabIcon = "search"
                        tabLabel = "Search"
                    } else if (route.name == Routes.ProfileScreen) {
                        // tabIcon = "chatbubbles-outline"
                        tabLabel = "Messages"
                    } 
                    // else if (route.name == Routes.Notifications) {
                    //     tabIcon = "notifications"
                    //     tabLabel = "Notifications"
                    // } else if (route.name == Routes.DrawerMenu) {
                    //     tabIcon = "md-menu-outline"
                    //     tabLabel = ""
                    // }

                    const isFocused = () => {
                        return route.name == navigation.getState().routes[navigation.getState().index].name
                    }

                    return (
                        <TouchableOpacity
                            {...props}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flexGrow: 1,
                                justifyContent: "center",
                                backgroundColor:theme.primary,
                            }}>
                            {/* <Ionicons
                                name={tabIcon}
                                size={24}
                                color={isFocused() || route.name == Routes.DrawerMenu ? "black" : "#A1A1AF"}
                                style={{
                                    marginRight: 5
                                }}
                            /> */}
                            {/* <Image source={tabIcon} /> */}

                            {isFocused() && (
                                <Text
                                    style={{
                                        color: "black",
                                        fontFamily: Fonts.semiBold,
                                        fontSize: 13
                                    }}>
                                    {tabLabel}
                                </Text>)}
                        </TouchableOpacity>
                    )
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle:{
                    paddingBottom:insets.bottom,
                    minHeight:55
                }
            })}
        >
            <BottomTab.Screen name={Routes.Home} component={Home} />
            <BottomTab.Screen name={Routes.Login} component={Login} />
            {/* <BottomTab.Screen name={Routes.Messages} component={Messages} /> */}
            <BottomTab.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
        </BottomTab.Navigator>
    );
};

export default BottomTabStack;