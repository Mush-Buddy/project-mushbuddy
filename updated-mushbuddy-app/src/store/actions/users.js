import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
export const SET_USERS = 'SET_USERS';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_FIND_PEOPLE = 'SET_FIND_PEOPLE';
export const ALERT = 'ALERT';
export const AUTHENTICATE = 'AUTHENTICATE';

export const fetchUsers = ({id, auth}) => async (dispatch) => {
    try {
        const res = getDataAPI(`users/${id}`, auth.token);
        const user = await res;
        dispatch({
            type: SET_USERS,
            payload: user.data,
        });
        return user.data.user;
    } catch (err) {
        dispatch({
            type: ALERT, 
            payload: {error: err.response.data.msg},
        });
    }
}

export const followUser = ({user, auth}) => async (dispatch) => {
    try {
        console.log(user,auth);
        dispatch({
            type: FOLLOW,
            user: user,
            loggedUser: auth.user,
        });
        console.log('past');
        dispatch({ 
            type: AUTHENTICATE, 
            payload: {
                ...auth,
                user: {...auth.user, following: [...auth.user.following, user]},
            },
        });
        const res = await patchDataAPI(`users/follow/${user._id}`, null, auth.token);
    } catch (err) {
        console.log(err);
        dispatch({
            type: ALERT, 
            payload: {error: err.response.data.msg},
        });
    }
}

export const unfollowUser = ({user,auth}) => async (dispatch) => {
    try {
        dispatch({
            type: UNFOLLOW,
            user: user,
            loggedUser: auth.user,
        });
        dispatch({ 
            type: AUTHENTICATE, 
            payload: {
                ...auth,
                user: {...auth.user, following: auth.user.following.filter(item => item._id !== user._id)},
            } 
        });
        const res = await patchDataAPI(`users/unfollow/${user._id}`, null, auth.token);
        console.log(res);
    } catch (err) {
        console.log(err);
        dispatch({
            type: ALERT, 
            payload: {error: err.response.data.msg},
        });
    }
}

export const updateProfile = ({userData, auth}) => async (dispatch) => {
    try {
        const res = await patchDataAPI("users/update", {
            ...userData,
        }, auth.token);
        dispatch({
            type: UPDATE_PROFILE,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                },
            },
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: ALERT, 
            payload: {error: err.response.data.msg},
        });
    }
}

export const fetchFindPeopleUsers = ({search, auth}) => async (dispatch) => {
    try {
        const res = await getDataAPI(`users?username=${search}`, auth.token)
        dispatch({
            type: SET_FIND_PEOPLE,
            payload: {
                users: res.data.users,
            },
        });
        return res.data.users;
    } catch (err) {
        dispatch({
            type: ALERT, 
            payload: {error: err.response.data.msg},
        });
    }
}