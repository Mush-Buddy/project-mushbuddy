import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu';
import authReducer from './src/store/reducers/auth';
import usersReducer from './src/store/reducers/users';
import postsReducer from './src/store/reducers/posts';

import AppNavigator from './src/navigation/AppNavigator';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  posts: postsReducer
});

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk)
));

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
      <FlashMessage position = "top"/>
    </Provider>
  );
};

