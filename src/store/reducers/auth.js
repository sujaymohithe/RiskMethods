import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case AUTH_SUCCESS:
            return Object.assign({}, state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            });
        case AUTH_FAIL:
            return Object.assign({}, state, {
                error: action.error,
                loading: false
            });
        case AUTH_LOGOUT:
            return Object.assign({}, state, {
                token: null,
                userId: null
            });
        case SET_AUTH_REDIRECT_PATH:
            return Object.assign({}, state, {
                authRedirectPath: action.path
            });
        default:
            return state;
    }
}