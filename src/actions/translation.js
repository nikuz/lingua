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
    TRANSLATION_IMAGE_TOGGLE_IMAGE_PICKER_VISIBILITY,
    TRANSLATION_IMAGE_SELECT,
    TRANSLATION_SAVE_REQUEST,
    TRANSLATION_SAVE_SUCCESS,
    TRANSLATION_SAVE_FAILURE,
    TRANSLATION_UPDATE_REQUEST,
    TRANSLATION_UPDATE_SUCCESS,
    TRANSLATION_UPDATE_FAILURE,
    TRANSLATIONS_GET_REQUEST,
    TRANSLATIONS_GET_SUCCESS,
    TRANSLATIONS_GET_FAILURE,
    TRANSLATIONS_CLEAR_LIST,
    TRANSLATION_SET_DELETE_STATE,
    TRANSLATION_DELETE_REQUEST,
    TRANSLATION_DELETE_SUCCESS,
    TRANSLATION_DELETE_FAILURE,
    TRANSLATION_CLEAR_DELETE_STATE,
    TRANSLATION_HIDE_ERRORS,
    TRANSLATION_SEARCH_REQUEST,
    TRANSLATION_SEARCH_SUCCESS,
    TRANSLATION_SEARCH_FAILURE,
    TRANSLATION_CLEAR_SEARCH_STATE,
    TRANSLATION_GET_RANDOM_WORD_REQUEST,
    TRANSLATION_GET_RANDOM_WORD_SUCCESS,
    TRANSLATION_GET_RANDOM_WORD_FAILURE,
    TRANSLATION_RANDOM_WORD_SET_DELETE_STATE,
    TRANSLATION_DELETE_RANDOM_WORD_REQUEST,
    TRANSLATION_DELETE_RANDOM_WORD_SUCCESS,
    TRANSLATION_DELETE_RANDOM_WORD_FAILURE,
} from '../types/actions/translation';
import type { StoreState } from '../store/type';
import type {
    TranslationResponse,
    TranslationSaveRequest,
    Translation,
    TranslationsListType,
    ImageResponse,
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
                Authorization: routerSelectors.getAuthorisation(),
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
): Promise<ImageResponse> => {
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
                Authorization: routerSelectors.getAuthorisation(),
            },
        }),
    });
};

export const toggleImagePickerVisibility = () => ({
    type: TRANSLATION_IMAGE_TOGGLE_IMAGE_PICKER_VISIBILITY,
});

export const selectImage = (image: string) => ({
    type: TRANSLATION_IMAGE_SELECT,
    payload: image,
});

export const removePronunciation = (word: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<*> => {
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
                Authorization: routerSelectors.getAuthorisation(),
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
                Authorization: routerSelectors.getAuthorisation(),
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
                Authorization: routerSelectors.getAuthorisation(),
            },
            contentType: 'json',
        }),
    });
};

export const getTranslations = (from: number, to: number) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<TranslationsListType> => {
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
                Authorization: routerSelectors.getAuthorisation(),
            },
            contentType: 'json',
        }),
    });
};

export const clearList = () => ({
    type: TRANSLATIONS_CLEAR_LIST,
});

export const setDeleteState = (translation: Translation) => ({
    type: TRANSLATION_SET_DELETE_STATE,
    payload: translation,
});

export const deleteTranslation = (id: number) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<*> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_DELETE_REQUEST,
        successAction: TRANSLATION_DELETE_SUCCESS,
        failureAction: TRANSLATION_DELETE_FAILURE,
        action: () => request.delete({
            url: `${apiUrl}/translate`,
            args: {
                id,
            },
            headers: {
                Authorization: routerSelectors.getAuthorisation(),
            },
            contentType: 'json',
        }),
    });
};

export const clearDeleteState = () => ({
    type: TRANSLATION_CLEAR_DELETE_STATE,
});

export const hideErrors = () => ({
    type: TRANSLATION_HIDE_ERRORS,
});

export const search = (value: string, from: number, to: number, signal: ?AbortSignal) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<*> => {
    dispatch({
        type: TRANSLATION_SEARCH_REQUEST,
    });

    const apiUrl = routerSelectors.getApiUrl(getState());
    const requestUrl = `${apiUrl}/translate/search?q=${value}&from=${from}&to=${to}`;

    return fetch(requestUrl, {
        headers: {
            Authorization: routerSelectors.getAuthorisation(),
        },
        signal,
    }).then((response) => {
        response.text().then((text) => {
            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                result = null;
            }

            if (result) {
                if (response.status === 200) {
                    dispatch({
                        type: TRANSLATION_SEARCH_SUCCESS,
                        wsForward: true,
                        payload: result,
                    });
                } else {
                    dispatch({
                        type: TRANSLATION_SEARCH_FAILURE,
                        payload: result,
                    });
                }
            }
        });
    });
};

export const clearSearchState = () => ({
    type: TRANSLATION_CLEAR_SEARCH_STATE,
});

export const getRandomWord = () => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<*> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_GET_RANDOM_WORD_REQUEST,
        successAction: TRANSLATION_GET_RANDOM_WORD_SUCCESS,
        failureAction: TRANSLATION_GET_RANDOM_WORD_FAILURE,
        action: () => request.get({
            url: `${apiUrl}/random_word`,
            headers: {
                Authorization: routerSelectors.getAuthorisation(),
            },
            contentType: 'json',
        }),
    });
};

export const setRandomWordDeleteState = (word: string) => ({
    type: TRANSLATION_RANDOM_WORD_SET_DELETE_STATE,
    payload: word,
});

export const deleteRandomWord = (word: string) => (
    dispatch: DispatchAPI<*>,
    getState: () => StoreState
): Promise<*> => {
    const apiUrl = routerSelectors.getApiUrl(getState());
    return actionCreator({
        dispatch,
        requestAction: TRANSLATION_DELETE_RANDOM_WORD_REQUEST,
        successAction: TRANSLATION_DELETE_RANDOM_WORD_SUCCESS,
        failureAction: TRANSLATION_DELETE_RANDOM_WORD_FAILURE,
        action: () => request.delete({
            url: `${apiUrl}/random_word`,
            args: {
                q: word,
            },
            headers: {
                Authorization: routerSelectors.getAuthorisation(),
            },
            contentType: 'json',
        }),
    });
};
