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
        <Stack.Navigator initialRouteName='Register' screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.Login} component={Login} />
          <Stack.Screen name={Routes.Register} component={Register} />
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