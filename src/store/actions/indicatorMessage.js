import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as appConstants from '../../AppConstants';

export const getIndicatorMessages = (indicatorMessages) => {
    return {
        type: actionTypes.GET_INDICATOR_MESSAGES,
        list: indicatorMessages
    };
};

export const fetchIndicatorMessagesFailed = () => {
    return {
        type: actionTypes.FETCH_INDICATOR_MESSAGES_FAILED
    };
};

export const indicatorMessagesStart = () => {
    return {
        type: actionTypes.INDICATOR_MESSAGES_START
    };
};

export const InitIndicatorMessages = (page = 1, isEventsChecked, fromRange = 0, toRange = 100) => {
    const config = {
        'Authorization': "Bearer " + localStorage.token,
        'content-type': 'application/json'
    };
    const url = !!isEventsChecked ? `${appConstants.API_URL}indicator_messages?filter[event]=true&` :
        `${appConstants.API_URL}indicator_messages?`;
    const range = !!isEventsChecked ? '' : (`&filter[risk_score_min]=${fromRange}&filter[risk_score_max]=${toRange}`);
    return dispatch => {
        dispatch(indicatorMessagesStart());
        axios.get(`${url}page[size]=
        20&fields[indicator_message]=name,subject,created_at,body,source,
        indicator_message_type,risk_score&page[number]=${page}${range}`, {
            headers: config
        }).then(response => {
            dispatch(getIndicatorMessages(response.data));
        }).catch(error => {
            dispatch(fetchIndicatorMessagesFailed());
        });
    };
};

export const getIndicatorMessageDetails = (indicatorMessageDetails) => {
    return {
        type: actionTypes.GET_INDICATOR_MESSAGE_DETAILS,
        data: indicatorMessageDetails
    };
};

export const fetchIndicatorMessageDetailsFailed = () => {
    return {
        type: actionTypes.FETCH_INDICATOR_MESSAGE_DETAILS_FAILED
    };
};

export const InitIndicatorMessageDetails = (id) => {
    let config = {
        'Authorization': "Bearer " + localStorage.token,
        'content-type': 'application/json'
    }
    return dispatch => {
        dispatch(indicatorMessagesStart());
        axios.get(`${appConstants.API_URL}indicator_messages/${id}?fields[indicator_message]=risk_score,name,subject,body,created_at,body,source,indicator_message_type`, {
            headers: config
        }).then(response => {
            dispatch(getIndicatorMessageDetails(response.data));
        }).catch(error => {
            dispatch(fetchIndicatorMessageDetailsFailed());
        });
    };
};
