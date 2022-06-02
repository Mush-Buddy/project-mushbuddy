import { ALERT, LOGOUT } from "../actions/auth";

const initialState = {};

const alert = (state = initialState, action) => {
    switch (action.type){
        case ALERT:
            return action.payload;
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default alert;