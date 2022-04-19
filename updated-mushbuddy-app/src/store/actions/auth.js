export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const ALERT = 'ALERT';
import { postDataAPI } from '../../utils/fetchData';

export const signin = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('auth/login', data);
        dispatch({ 
            type: AUTHENTICATE,
            payload: {
                token: 'Bearer ' + res.data.accessToken,
                user: res.data.user,
            },
        });
        return res.data.user;
    } catch (err) {
        //console.log(err.response.data.msg);
        dispatch({
            type: ALERT,
            payload: {
                error: err.response.data.msg,
            },
        });
        return err.response.data.msg;
    }
}

export const signup = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('auth/register', data);
        console.log(res.data);
        dispatch({ 
            type: AUTHENTICATE, 
            payload: {
                user: res.data.newuser
            } 
        })
        dispatch(signin(data));
    } catch (err) {
        console.log(err.response.data.msg);
        dispatch({ 
            type: ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    };
}