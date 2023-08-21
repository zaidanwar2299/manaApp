import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
// import FlashMessage from 'react-native-flash-message';
import { RootSiblingParent } from 'react-native-root-siblings';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import SplashScreen from 'react-native-splash-screen';
// import { useDispatch } from 'react-redux';
// import Fonts from '../assets/fonts';

// import UserProfile from '../screens/userProfile';
// import Services from '../services';
// import { setCountries } from '../store/actions/app';
// import { setTalks } from '../store/actions/talk';
import Routes from './routes';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Home from '../screens/home';
import BottomTabStack from './stacks/BottomTabStack';
import ProfileScreen from '../screens/ProfileScreen';
import Activity from '../screens/activity';
import Contacts from '../screens/contacts';
import CreateAppointment from '../screens/createAppointment';
import RestoreAccess from '../screens/auth/restoreAccess';
import AddLocation from '../screens/createAppointment/sections/addLocation';
// import MapScreen from '../screens/MapScreen';

// import DrawerStack from "./stacks/drawerStack";

const Stack = createStackNavigator();

const RootNavigator = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   SplashScreen.hide();
  //   Services.Location.getCountries().then((res) => {
  //     dispatch(setCountries(res.data))
  //   })
  // }, [])


  return (
    <>
      {/* <RootSiblingParent>  */}
        <Stack.Navigator initialRouteName='BottomTabStack' screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.BottomTabStack} component={BottomTabStack} />
          <Stack.Screen name={Routes.Login} component={Login} />
          <Stack.Screen name={Routes.Register} component={Register} />
          <Stack.Screen name={Routes.RestoreAccess} component={RestoreAccess} />
          <Stack.Screen name={Routes.Home} component={Home} />
          <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen} />
          <Stack.Screen name={Routes.Activity} component={Activity} />
          <Stack.Screen name={Routes.Contacts} component={Contacts} />
          <Stack.Screen name={Routes.CreateAppointment} component={CreateAppointment} />
          <Stack.Screen name={Routes.AddLocation} component={AddLocation} />
          {/* <Stack.Screen name={Routes.MapScreen} component={MapScreen} /> */}
        </Stack.Navigator>
        {/* <FlashMessage
          position="bottom"
          titleStyle={{
            fontFamily: Fonts.semiBold,
             textAlign:"center"
          }}
          duration={3000}
        /> */}
      {/* </RootSiblingParent>/ */}

    </>
  );
};

export default RootNavigator;