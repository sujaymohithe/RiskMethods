import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as appConstants from '../../AppConstants';

//login start
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

//login success
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

//login fail
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

//logout trigger
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//When token expires, below method is used to fetch new token
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            const authData = {
                grant_type: 'refresh_token',
                client_id: appConstants.CLIENT_ID,
                client_secret: appConstants.CLIENT_SECRET,
                refresh_token: localStorage.refresh_token
            };
            let url = appConstants.AUTH_API_URL;
            axios.post(url, authData)
                .then(response => {
                    const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', localStorage.userId);
                    dispatch(checkAuthTimeout(response.data.expires_in));
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                });
        }, (expirationTime - 180) * 1000);
    };
};

//authentication method to create token and gain application accesss
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            grant_type: 'password',
            username: email,
            password: password,
            client_id: appConstants.CLIENT_ID,
            client_secret: appConstants.CLIENT_SECRET
        };
        let url = appConstants.AUTH_API_URL;
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() +
                    response.data.expires_in * 1000);
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', authData.username);
                dispatch(authSuccess(response.data.access_token, authData.username));
                dispatch(checkAuthTimeout(response.data.expires_in));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

//Directs to Auth if not logged in 
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

//If already logged in, check for token and navigate user to home page. 
//Otherwise logout is triggered
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() -
                    new Date().getTime()) / 1000));
            }
        }
    };
};