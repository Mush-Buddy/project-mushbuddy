import { SET_USERS, SET_FIND_PEOPLE, FOLLOW, UNFOLLOW, FOLLOW_FIND_PEOPLE, UPDATE_USER } from "../actions/users";
import { LOGOUT } from "../actions/auth";

const initialState = {
    allUsers: [],
    findPeople: []
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return {
                ...state,
                allUsers: [...state.allUsers,action.payload.user],
            };
        case SET_FIND_PEOPLE:
            return {
                ...state,
                findPeople: action.payload.users,
            };
        case FOLLOW:
            const userInd = state.allUsers.findIndex(user => user._id === action.user._id);
            if (userInd !== -1) {
                const updatedFollowAllUsers = [...state.allUsers];
                updatedFollowAllUsers[userInd].followers = updatedFollowAllUsers[userInd].followers.concat(action.loggedUser);
                return {
                    ...state,
                    allUsers: updatedFollowAllUsers,
                };
            }
            return {
                ...state
            };
        case UNFOLLOW:
            const userIdx = state.allUsers.findIndex(user => user._id === action.user._id);
            if (userIdx !== -1){
                const updatedUnfollowAllUsers = state.allUsers;
                updatedUnfollowAllUsers[userIdx].followers = updatedUnfollowAllUsers[userIdx].followers.filter(u => u._id !== action.loggedUser._id)
                return{
                    ...state,
                    allUsers: updatedUnfollowAllUsers
                }
            }
            return {
                ...state
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}

