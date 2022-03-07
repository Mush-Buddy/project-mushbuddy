import axios from 'axios'
import { BASE_URL } from './config.js'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`, {
        headers: { token: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/${url}`, {
        headers: { token: token}
    })
    return res;
}