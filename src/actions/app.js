// @flow

import type { DispatchAPI } from 'redux';
import {
    actionCreator,
    request,
} from '../utils';
import {
    APP_GET_API_IP_REQUEST,
    APP_GET_API_IP_SUCCESS,
    APP_GET_API_IP_FAILURE,
} from '../types/actions/app';

export const getApiIP = () => (dispatch: DispatchAPI<*>) => (
    actionCreator({
        dispatch,
        requestAction: APP_GET_API_IP_REQUEST,
        successAction: APP_GET_API_IP_SUCCESS,
        failureAction: APP_GET_API_IP_FAILURE,
        action: () => request.get({
            url: process.env.API_GETTER_URL,
        }),
    })
);
