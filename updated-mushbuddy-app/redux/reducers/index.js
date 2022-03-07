import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';

const rootReducer = combineReducers({
    auth,
    profile
});

export default rootReducer;