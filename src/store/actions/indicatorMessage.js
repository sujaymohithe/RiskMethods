import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as appConstants from '../../AppConstants';

//get indicator messages success
export const getIndicatorMessages = (indicatorMessages) => {
    return {
        type: actionTypes.GET_INDICATOR_MESSAGES,
        list: indicatorMessages
    };
};

//get indicator messages failure
export const fetchIndicatorMessagesFailed = () => {
    return {
        type: actionTypes.FETCH_INDICATOR_MESSAGES_FAILED
    };
};

//get indicator messages start
export const indicatorMessagesStart = () => {
    return {
        type: actionTypes.INDICATOR_MESSAGES_START
    };
};

//get indicator messages api call
export const InitIndicatorMessages = (page = 1, isEventsChecked,
    fromRange = 0, toRange = 100) => {
    const config = {
        'Authorization': "Bearer " + localStorage.token,
        'content-type': 'application/json'
    };
    const url = !!isEventsChecked ? `${appConstants.API_URL}indicator_messages?filter[event]=true&` :
        `${appConstants.API_URL}indicator_messages?`;
    const range = !!isEventsChecked ? '' :
        (`&filter[risk_score_min]=${fromRange}&filter[risk_score_max]=${toRange}`);
    return dispatch => {
        dispatch(indicatorMessagesStart());
        axios.get(`${url}${appConstants.MESSAGES_FILTER}${page}${range}`, {
            headers: config
        }).then(response => {
            dispatch(getIndicatorMessages(response.data));
        }).catch(error => {
            dispatch(fetchIndicatorMessagesFailed());
        });
    };
};

//get individual indicator message details success
export const getIndicatorMessageDetails = (indicatorMessageDetails) => {
    return {
        type: actionTypes.GET_INDICATOR_MESSAGE_DETAILS,
        data: indicatorMessageDetails
    };
};

//get individual indicator message details failure
export const fetchIndicatorMessageDetailsFailed = () => {
    return {
        type: actionTypes.FETCH_INDICATOR_MESSAGE_DETAILS_FAILED
    };
};

//get individual indicator message details api call
export const InitIndicatorMessageDetails = (id) => {
    let config = {
        'Authorization': "Bearer " + localStorage.token,
        'content-type': 'application/json'
    }
    return dispatch => {
        dispatch(indicatorMessagesStart());
        axios.get(`${appConstants.API_URL}indicator_messages
        /${id}${appConstants.MESSAGEDETAILS_FILTER}`, {
            headers: config
        }).then(response => {
            dispatch(getIndicatorMessageDetails(response.data));
        }).catch(error => {
            dispatch(fetchIndicatorMessageDetailsFailed());
        });
    };
};
