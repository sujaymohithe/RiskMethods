//All constants are defined here
export const AUTH_API_URL = 'https://cors-anywhere.herokuapp.com/https://stagingauth.riskmethods.net/oauth/token';
export const CLIENT_ID = 'fjHsalRElzo6JB_dvIGx6pw2p4WMT0pMjhtcW7d159Q';
export const CLIENT_SECRET = 'dSANY4dUV8cn-24WD8R9tBlWtWM70RrabWbfOne442o';
export const API_URL = 'https://cors-anywhere.herokuapp.com/https://stagingapi.riskmethods.net/v2/';
export const NO_RESULTS = 'No results, please refine your filters';
export const INVALID_CREDENTIALS = 'Please enter valid credentials';
export const MESSAGEDETAILS_FILTER = '?fields[indicator_message]=risk_score,name,subject,body,created_at,body,source,indicator_message_type';
export const MESSAGES_FILTER = 'page[size]=20&fields[indicator_message]=name,subject,created_at,body,source,' +
    'indicator_message_type,risk_score&page[number]=';