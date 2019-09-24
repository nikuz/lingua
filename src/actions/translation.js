// @flow

import type { DispatchAPI } from 'redux';
import {
    actionCreator,
    request,
} from '../utils';
import { routerSelectors } from '../selectors';
import {
    TRANSLATION_REQUEST,
    TRANSLATION_SUCCESS,
    TRANSLATION_FAILURE,
    TRANSLATION_CLEAR_STATE,
    TRANSLATION_REMOVE_PRONUNCIATION_REQUEST,
    TRANSLATION_REMOVE_PRONUNCIATION_SUCCESS,
    TRANSLATION_REMOVE_PRONUNCIATION_FAILURE,
    TRANSLATION_IMAGE_REQUEST,
    TRANSLATION_IMAGE_SUCCESS,
    TRANSLATION_IMAGE_FAILURE,
} from '../types/actions/translation';
import type { StoreState } from '../store/type';
import type {
    TranslationResponse,
} from '../types';

export const get = (word: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_REQUEST,
        successAction: TRANSLATION_SUCCESS,
        failureAction: TRANSLATION_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/translate?q=${word}`,
            headers: {
                Authorization: process.env.API_KEY,
            },
        }),
    });
};

export const clearState = () => ({
    type: TRANSLATION_CLEAR_STATE,
});

export const getImage = (word: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_IMAGE_REQUEST,
        successAction: TRANSLATION_IMAGE_SUCCESS,
        failureAction: TRANSLATION_IMAGE_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/image?word=${word}`,
            headers: {
                Authorization: process.env.API_KEY,
            },
        }),
    });
};

export const removePronunciation = (word: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_REMOVE_PRONUNCIATION_REQUEST,
        successAction: TRANSLATION_REMOVE_PRONUNCIATION_SUCCESS,
        failureAction: TRANSLATION_REMOVE_PRONUNCIATION_FAILURE,
        action: () => request.delete({
            url: `${apiUrl}/pronunciation?word=${word}`,
            headers: {
                Authorization: process.env.API_KEY,
            },
        }),
    });
};
