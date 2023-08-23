/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './src/navigation/root';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/auth/login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './src/common/theme';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { navigationRef } from './src/navigation/navigation.utils';
import Geocoder from 'react-native-geocoding';
import Config from './src/common/config';

const Tab = createBottomTabNavigator();

const Stack  = createStackNavigator()

Geocoder.init(Config.GOOGLE_MAP_API_KEY);

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store} >
      <NavigationContainer 
      ref={navigationRef}
      theme={{
        colors: {
          background: theme.primary,
          card: 'white',
        },
      }}
      >
        <RootNavigator />
      {/* <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator> */}
      </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
