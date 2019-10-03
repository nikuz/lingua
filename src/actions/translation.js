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
    TRANSLATION_SAVE_REQUEST,
    TRANSLATION_SAVE_SUCCESS,
    TRANSLATION_SAVE_FAILURE,
    TRANSLATION_UPDATE_REQUEST,
    TRANSLATION_UPDATE_SUCCESS,
    TRANSLATION_UPDATE_FAILURE,
    TRANSLATIONS_GET_REQUEST,
    TRANSLATIONS_GET_SUCCESS,
    TRANSLATIONS_GET_FAILURE,
    TRANSLATION_HIDE_ERRORS,
} from '../types/actions/translation';
import type { StoreState } from '../store/type';
import type {
    TranslationResponse,
    TranslationSaveRequest,
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
            url: `${apiUrl}/translate`,
            args: {
                q: word,
            },
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
            url: `${apiUrl}/image`,
            args: {
                q: word,
            },
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
            url: `${apiUrl}/pronunciation`,
            args: {
                q: word,
            },
            headers: {
                Authorization: process.env.API_KEY,
            },
        }),
    });
};

export const save = (data: TranslationSaveRequest) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_SAVE_REQUEST,
        successAction: TRANSLATION_SAVE_SUCCESS,
        failureAction: TRANSLATION_SAVE_FAILURE,
        action: () => request.post({
            url: `${apiUrl}/translate`,
            args: data,
            headers: {
                Authorization: process.env.API_KEY,
            },
            contentType: 'json',
        }),
    });
};

export const update = (data: TranslationSaveRequest) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_UPDATE_REQUEST,
        successAction: TRANSLATION_UPDATE_SUCCESS,
        failureAction: TRANSLATION_UPDATE_FAILURE,
        action: () => request.put({
            url: `${apiUrl}/translate`,
            args: data,
            headers: {
                Authorization: process.env.API_KEY,
            },
            contentType: 'json',
        }),
    });
};

export const getTranslations = (from: number, to: number) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationResponse> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATIONS_GET_REQUEST,
        successAction: TRANSLATIONS_GET_SUCCESS,
        failureAction: TRANSLATIONS_GET_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/translations`,
            args: {
                from,
                to,
            },
            headers: {
                Authorization: process.env.API_KEY,
            },
            contentType: 'json',
        }),
    });
};

export const translationHideErrors = () => ({
    type: TRANSLATION_HIDE_ERRORS,
});
