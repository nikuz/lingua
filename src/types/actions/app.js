// @flow

import type { ErrorObject } from '../common';

export const GET_API_IP_REQUEST = 'GET_API_IP_REQUEST';
export const GET_API_IP_SUCCESS = 'GET_API_IP_SUCCESS';
export const GET_API_IP_FAILURE = 'GET_API_IP_FAILURE';

export type SetApiIPRequestAction = {
    +type: 'GET_API_IP_REQUEST',
};

export type SetApiIPSuccessAction = {
    +type: 'GET_API_IP_SUCCESS',
    +payload: string,
};

export type SetApiIPFailureAction = {
    +type: 'GET_API_IP_FAILURE',
    +payload: ErrorObject,
};
