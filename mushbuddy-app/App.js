import React from 'react';
import MainTabBar from './navigation/main_tab_bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionTypes } from './actions';

// import { LogBox } from 'react-native';

// disable really annoying in app warnings
// LogBox.ignoreAllLogs();

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
));

const App = (props) => {
  return (
    <Provider store={store}>
      <MainTabBar />
    </Provider>
  );
  //return <MainTabBar />;
};


export default App;
