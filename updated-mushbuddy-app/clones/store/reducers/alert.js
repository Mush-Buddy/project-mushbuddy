import {  ALERT } from "../actions/auth";

const initialState = {}

const alert = (state = initialState, action) => {
    switch (action.type){
        case ALERT:
            return action.payload;
        default:
            return state;
    }
}


export default alert