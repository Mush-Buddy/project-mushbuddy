import { SET_USERS, SET_FIND_PEOPLE, FOLLOW_FIND_PEOPLE, UPDATE_USER } from "../actions/users";
import { LOGOUT } from "../actions/auth";

const initialState = {
    allUsers: [],
    findPeople: []
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return{
                ...state,
                allUsers: [...state.allUsers,action.payload.user]
            }
        case SET_FIND_PEOPLE:
            return{
                ...state,
                findPeople: action.payload.users
            }
        /** 
        case FOLLOW:
            const updatedFollowAllUsers = state.allUsers;
            updatedFollowAllUsers.following = updatedFollowAllUsers.following.concat(action.user);
            return{
                ...state,
                allUsers: updatedFollowAllUsers
            }
        case UNFOLLOW:
            const updatedUnfollowAllUsers = state.allUsers;
            updatedUnfollowAllUsers.following = updatedUnfollowAllUsers.following.filter(u => u._id !== action.user._id)
            return{
                ...state,
                allUsers: updatedUnfollowAllUsers
            }
        */
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}

