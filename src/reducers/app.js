// @flow
import {
    APP_GET_API_IP_REQUEST,
    APP_GET_API_IP_SUCCESS,
    APP_GET_API_IP_FAILURE,
} from '../types/actions/app';
import type {
    GetApiIPRequestAction,
    GetApiIPSuccessAction,
    GetApiIPFailureAction,
    ErrorObject,
} from '../types';

export type AppReducerState = {
    apiIPLoading: boolean,
    apiIP: string,
    apiIPError: ?ErrorObject,
};

const initialState: AppReducerState = {
    apiIPLoading: true,
    apiIP: '',
    apiIPError: null,
};

type Action =
    GetApiIPRequestAction
    | GetApiIPSuccessAction
    | GetApiIPFailureAction;

export default function appReducer(
    state: AppReducerState = initialState,
    action: Action
): AppReducerState {
    switch (action.type) {
        case APP_GET_API_IP_REQUEST:
            return {
                ...state,
                apiIPLoading: true,
                apiIPError: null,
            };

        case APP_GET_API_IP_SUCCESS:
            return {
                ...state,
                apiIPLoading: false,
                apiIP: process.env.NODE_ENV !== 'production' ? 'localhost' : action.payload,
            };

        case APP_GET_API_IP_FAILURE:
            return {
                ...state,
                apiIPLoading: false,
                apiIPError: action.payload,
            };

        default:
            (action: empty); // eslint-disable-line
            return state;
    }
}
