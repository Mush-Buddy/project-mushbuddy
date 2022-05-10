import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
export const ALERT = 'ALERT';
export const CREATE_POST = "CREATE_PRODUCT";
export const SET_POSTS = 'SET_POSTS';
export const UPDATE_POST = 'UPDATE_POST';

export const fetchPosts = ({id,auth}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`posts/${id}`, auth.token);
        dispatch({
            type: SET_POSTS,
            payload: {...res.data},
        });
    } catch (err) {
        dispatch({
            type: ALERT,
            payload: {error: err.response.data.msg},
        });
    }
}

export const createPost = ({postData, auth}) => async (dispatch) => {
    try {
        const { title, content, mushroom, coordinate } = postData;
        const res = await postDataAPI('posts', { title, content, mushroom, coordinate }, auth.token);
        dispatch({ 
            type: CREATE_POST,
            payload: {...res.data.newPost, user: auth.user},
        });
    } catch (err) {
        console.log(err.response.data.msg);
        dispatch({
            type: ALERT,
            payload: {error: err.response.data.msg},
        });
    }
}

export const updatePost = ({id, postData, auth}) => async (dispatch) => {
    // console.log("id: " + id);
    // console.log(postData);

    try {
        const { title, content, mushroom, coordinate } = postData;
        const res = await patchDataAPI(`posts/update/${id}`, { title, content, mushroom, coordinate }, auth.token);
        dispatch({ 
            type: UPDATE_POST,
            payload: {...res.data.newPost, user: auth.user},
        });
    } catch (err) {
        console.log(err.response.data.msg);
        dispatch({
            type: ALERT,
            payload: {error: err.response.data.msg},
        });
    }
}