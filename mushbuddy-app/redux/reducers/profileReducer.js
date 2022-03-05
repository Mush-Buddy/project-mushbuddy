import { PROFILE_TYPES } from '../actions/profileAction';
import { EditData } from '../actions/globalTypes';

const initialState = {
    loading: false,
    ids: [],
    users: [],
    posts: [],

    // **NEW
    // numerical value storing the number of posts
    newPostMade: 0
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case PROFILE_TYPES.NEW_POST_MADE:
            return {
                ...state,
                newPostMade: state.newPostMade + 1
            }
        default:
            return state;
    }
}

export default profileReducer;