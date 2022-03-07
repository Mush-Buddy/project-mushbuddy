import { SET_POSTS, CREATE_POST } from "../actions/posts";
import { LOGOUT } from "../actions/auth";

const initialState = {
    allPosts: [],
    newPost: 0
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_POSTS:
            return {
                ...state,
                allPosts: [...state.allPosts,action.payload.posts]
            }
        case CREATE_POST:
            return{
                ...state,
                newPost: state.newPost + 1
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}