import React from 'react';
import MainTabBar from './navigation/main_tab_bar';
import SignIn from './navigation/signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { LogBox } from 'react-native';

// disable really annoying in app warnings
// LogBox.ignoreAllLogs();

const App = (props) => {
  return <SignIn />;
  // return <MainTabBar />;
};


export default App;
