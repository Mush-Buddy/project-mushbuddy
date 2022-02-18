import { ActionTypes } from '../actions';

const UserReducer = (state = { userObject: ''}, action) => {
    switch (action.type) {
        case ActionTypes.GET_USER_BY_ID:
            return {
                ...state,
                userObject: action.payload,
            };
        default:
            return state;
    }
};

export default UserReducer;