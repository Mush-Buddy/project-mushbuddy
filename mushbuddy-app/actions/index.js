import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGQyYzAwMGUwNjBkZmRkNDg3OGFlZCIsImlhdCI6MTY0NTAzMDQxNywiZXhwIjoxNjQ1MTE2ODE3fQ.R3rAUf6nAeJ3HSiaZaBjzCmTA0iMyW8LaTEXqoBPWvA';

export const ROOT_URL = 'http://localhost:5000';

export const TEST_USERID = '620d2c000e060dfdd4878aed';

// Keys

export const ActionTypes = {
    SEARCH_USER: 'SEARCH_USER',
    GET_USER_BY_ID: 'GET_USER_BY_ID',
    //GET_USER_NAME: 'GET_USER_NAME',
    //GET_ALL_POSTS: 'GET_ALL_POSTS',
    //GET_ALL_BADGES: 'GET_ALL_BADGES',
};

// Methods

export function searchUser() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users?username=testUser&limit=1`).users[0].then((response) => {
            dispatch({
                type: ActionTypes.SEARCH_USER,
                payload: response.data,
            });
        }).catch((e) => {
            console.log(`Error getting all posts: ${e}`);
        });
    };
}

export function getUserByID() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/users/${TEST_USERID}`, {
            headers: { token: TOKEN },
        }).then((response) => {
            console.log(`Testing getUserByID: ${response}`);
            dispatch({
                type: ActionTypes.GET_USER_BY_ID,
                payload: response.data,
            });
        }).catch((e) => {
            console.log(`Error getting user by ID: ${e}`);
        });
    };
}

// export function getUserByID() {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/users/${TEST_USERID}`).user.then((response) => {
//             console.log(`Testing getUserByID: ${response}`);
//             dispatch({
//                 type: ActionTypes.GET_USER_BY_ID,
//                 payload: response.data,
//             });
//         }).catch((e) => {
//             console.log(`Error getting user name: ${e}`);
//         });
//     };
// }

// export function getAllPosts(userID) {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/posts/?includeFollowing=0`).then((response) => {
//             dispatch({
//                 type: ActionTypes.GET_ALL_POSTS,
//                 payload: response.data,
//             });
//         }).catch((e) => {
//             console.log(`Error getting all posts: ${e}`);
//         });
//     };
// }

// export function getAllBadges(userID) {
//     return (dispatch) => {
//         axios.get(`${ROOT_URL}/`)
//     }
// }