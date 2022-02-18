import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/index'
// import { LogBox } from 'react-native';

// const express = require('express');
// const jwt = require('jsonwebtoken');

// disable really annoying in app warnings
// LogBox.ignoreAllLogs();


const App = (props) => {
  return (
  <Navigation></Navigation>
  // return <MainTabBar />;
  );
};


export default App;
