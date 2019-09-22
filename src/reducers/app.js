// @flow
import {
    GET_API_IP_REQUEST,
    GET_API_IP_SUCCESS,
    GET_API_IP_FAILURE,
} from '../types/actions/app';
import type {
    SetApiIPRequestAction,
    SetApiIPSuccessAction,
    SetApiIPFailureAction,
    ErrorObject,
} from '../types';

export type AppReducerState = {
    apiIPLoading: boolean,
    apiIP: string,
    apiIPError: ?ErrorObject,
};

const initialState: AppReducerState = {
    apiIPLoading: false,
    apiIP: '',
    apiIPError: null,
};

type Action =
    SetApiIPRequestAction
    | SetApiIPSuccessAction
    | SetApiIPFailureAction;

export default function appState(
    state: AppReducerState = initialState,
    action: Action
): AppReducerState {
    switch (action.type) {
        case GET_API_IP_REQUEST:
            return {
                ...state,
                apiIPLoading: true,
            };

        case GET_API_IP_SUCCESS:
            return {
                ...state,
                apiIPLoading: false,
                apiIP: process.env.NODE_ENV !== 'production' ? 'localhost' : action.payload,
            };

        case GET_API_IP_FAILURE:
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
