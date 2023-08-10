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

const Tab = createBottomTabNavigator();

const Stack  = createStackNavigator()

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer 
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
