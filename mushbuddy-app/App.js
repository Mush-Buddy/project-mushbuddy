import MainTabBar from './navigation/main_tab_bar';
import Register from './navigation/register';
import Index from './index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';

// import { LogBox } from 'react-native';

// disable really annoying in app warnings
// LogBox.ignoreAllLogs();

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)
));

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
  //return <MainTabBar />;
};

export default App;
