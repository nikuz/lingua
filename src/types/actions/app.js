// @flow

import type { ErrorObject } from '../common';

export const APP_GET_API_IP_REQUEST = 'APP_GET_API_IP_REQUEST';
export const APP_GET_API_IP_SUCCESS = 'APP_GET_API_IP_SUCCESS';
export const APP_GET_API_IP_FAILURE = 'APP_GET_API_IP_FAILURE';

export type GetApiIPRequestAction = {
    +type: 'APP_GET_API_IP_REQUEST',
};

export type GetApiIPSuccessAction = {
    +type: 'APP_GET_API_IP_SUCCESS',
    +payload: string,
};

export type GetApiIPFailureAction = {
    +type: 'APP_GET_API_IP_FAILURE',
    +payload: ErrorObject,
};
