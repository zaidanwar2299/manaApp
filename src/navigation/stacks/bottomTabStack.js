import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import Fonts from '../../assets/fonts';
import { Ionicons } from "../../assets/vectorIcons";
import BusinessProfile from '../../screens/businessProfile';
import Home from '../../screens/home';
import Messages from '../../screens/messages';
import Notifications from '../../screens/notifications';
import Search from '../../screens/search';
import { openDrawer } from '../navigation.utils';
import Routes from '../routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
                        tabIcon = "home"
                        tabLabel = "Home"
                    } else if (route.name == Routes.Search) {
                        tabIcon = "search"
                        tabLabel = "Search"
                    } else if (route.name == Routes.Messages) {
                        tabIcon = "chatbubbles-outline"
                        tabLabel = "Messages"
                    } else if (route.name == Routes.Notifications) {
                        tabIcon = "notifications"
                        tabLabel = "Notifications"
                    } else if (route.name == Routes.DrawerMenu) {
                        tabIcon = "md-menu-outline"
                        tabLabel = ""
                    }

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
                                justifyContent: "center"
                            }}>
                            <Ionicons
                                name={tabIcon}
                                size={24}
                                color={isFocused() || route.name == Routes.DrawerMenu ? "black" : "#A1A1AF"}
                                style={{
                                    marginRight: 5
                                }}
                            />
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
            <BottomTab.Screen name={Routes.Search} component={Search} />
            {/* <BottomTab.Screen name={Routes.Messages} component={Messages} /> */}
            <BottomTab.Screen name={Routes.Notifications} component={Notifications} />
        </BottomTab.Navigator>
    );
};

export default BottomTabStack;