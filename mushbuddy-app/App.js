import React from 'react';
import MainTabBar from './navigation/main_tab_bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionTypes } from './actions';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/index'
// import { LogBox } from 'react-native';

// const express = require('express');
// const jwt = require('jsonwebtoken');

// disable really annoying in app warnings
// LogBox.ignoreAllLogs();

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
));

const App = (props) => {
  return (
    
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
  //return <MainTabBar />;
};


export default App;
