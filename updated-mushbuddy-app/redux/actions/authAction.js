import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await postDataAPI('auth/login', data)
        //console.log(res.data)
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: 'Bearer ' + res.data.accessToken,
                user: res.data.user
            } 
        })

    } catch (err) {
        console.log(err.response.data.msg)
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const register = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('auth/register', data)
        console.log(res.data)
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                user: res.data.newuser
            } 
        })
    } catch (err) {
        console.log(err.response.data.msg)
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}
