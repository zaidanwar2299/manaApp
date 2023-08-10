import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Loader from "../../../components/views/loader"
import Event from "../../../screens/event"
import Talk from "../../../screens/talk"
import Routes from "../../routes"
import BottomTabStack from "../bottomTabStack"
import CustomDrawer from "./items/customDrawer"

const Drawer = createDrawerNavigator()

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => {
                return <CustomDrawer {...props} />
            }}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: wp(80)
                },
            }}
        >
            <Drawer.Screen name={Routes.BottomTabStack} component={BottomTabStack} />
            {/* <Drawer.Screen name={Routes.GiveReview} component={Loader}
                options={() => ({
                    title: "Write a review"
                })}
            /> */}
            <Drawer.Screen name={Routes.Event.Index} component={Event}
                options={() => ({
                    title: "Events"
                })}
            />
            <Drawer.Screen name={Routes.Talk.Index} component={Talk}
                options={() => ({
                    title: "Talks"
                })}
            />
            {/* <Drawer.Screen name={"Language"} component={Loader} /> */}
            {/* <Drawer.Screen name={"Country"} component={Loader} /> */}
            <Drawer.Screen name={Routes.AboutPepol} component={Loader}
                options={{
                    title: "About Pepol"
                }}
            />
            <Drawer.Screen name={Routes.Trust_n_Safety} component={Loader}
                options={{
                    title: "Trust & Safety"
                }}
            />
            <Drawer.Screen name={Routes.TermsOfService} component={Loader}
                options={{
                    title: "Terms of Service"
                }}
            />
            <Drawer.Screen name={Routes.PrivacyPolicy} component={Loader}
                options={{
                    title: "Privacy Policy"
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack;