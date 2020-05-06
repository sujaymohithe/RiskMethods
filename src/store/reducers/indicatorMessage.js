import {
    GET_INDICATOR_MESSAGES, FETCH_INDICATOR_MESSAGES_FAILED,
    GET_INDICATOR_MESSAGE_DETAILS, FETCH_INDICATOR_MESSAGE_DETAILS_FAILED,
    INDICATOR_MESSAGES_START
}
    from '../actions/actionTypes';

export function indicatorMessage(state = {
    messages: [],
    error: false,
    messageData : {},
    loading : true
}, action) {
    switch (action.type) {
        case INDICATOR_MESSAGES_START:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case GET_INDICATOR_MESSAGES:
            return Object.assign({}, state, {
                messages: action.list,
                loading: false
            });
        case FETCH_INDICATOR_MESSAGES_FAILED:
            return Object.assign({}, state, {
                error: true,
                loading: false
            });
        case GET_INDICATOR_MESSAGE_DETAILS:
            return Object.assign({}, state, {
                messageData: action.data,
                loading: false
            });
        case FETCH_INDICATOR_MESSAGE_DETAILS_FAILED:
            return Object.assign({}, state, {
                error: true,
                loading: false
            });
        default:
            return state;
    }
}