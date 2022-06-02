import { LOGOUT } from "../actions/auth";

const initialState = {
    socket: ''
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SOCKET':
            return {
                ...state,
                socket: action.payload,
            };
        case LOGOUT:
            if (state.socket !== ''){
                state.socket.disconnect()
            }
            return initialState
        default:
            return state;
    }
}