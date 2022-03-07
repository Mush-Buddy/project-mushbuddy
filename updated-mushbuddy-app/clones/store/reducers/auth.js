import { AUTHENTICATE, LOGOUT } from "../actions/auth";
import {UPDATE_PROFILE} from "../actions/users"

const initialState = { }

export default (state=initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}