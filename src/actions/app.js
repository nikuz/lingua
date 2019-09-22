// @flow

import type { DispatchAPI } from 'redux';
import {
    actionCreator,
    request,
} from '../utils';
import {
    GET_API_IP_REQUEST,
    GET_API_IP_SUCCESS,
    GET_API_IP_FAILURE,
} from '../types/actions/app';
import { apiIPGetterURL } from '../constants/app';

export const getApiIP = () => (dispatch: DispatchAPI<*>) => (
    actionCreator({
        dispatch,
        requestAction: GET_API_IP_REQUEST,
        failureAction: GET_API_IP_FAILURE,
        successAction: GET_API_IP_SUCCESS,
        action: () => request.get({
            url: apiIPGetterURL,
        }),
    })
);
