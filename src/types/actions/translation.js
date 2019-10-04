// @flow

import type { ErrorObject } from '../common';
import type {
    TranslationResponse,
    ImageResponse,
    TranslationsList,
    Translation,
} from '../translation';

export const TRANSLATION_REQUEST = 'TRANSLATION_REQUEST';
export const TRANSLATION_SUCCESS = 'TRANSLATION_SUCCESS';
export const TRANSLATION_FAILURE = 'TRANSLATION_FAILURE';
export const TRANSLATION_CLEAR_STATE = 'TRANSLATION_CLEAR_STATE';
export const TRANSLATION_REMOVE_PRONUNCIATION_REQUEST = 'TRANSLATION_REMOVE_PRONUNCIATION_REQUEST';
export const TRANSLATION_REMOVE_PRONUNCIATION_SUCCESS = 'TRANSLATION_REMOVE_PRONUNCIATION_SUCCESS';
export const TRANSLATION_REMOVE_PRONUNCIATION_FAILURE = 'TRANSLATION_REMOVE_PRONUNCIATION_FAILURE';
export const TRANSLATION_IMAGE_REQUEST = 'TRANSLATION_IMAGE_REQUEST';
export const TRANSLATION_IMAGE_SUCCESS = 'TRANSLATION_IMAGE_SUCCESS';
export const TRANSLATION_IMAGE_FAILURE = 'TRANSLATION_IMAGE_FAILURE';
export const TRANSLATION_SAVE_REQUEST = 'TRANSLATION_SAVE_REQUEST';
export const TRANSLATION_SAVE_SUCCESS = 'TRANSLATION_SAVE_SUCCESS';
export const TRANSLATION_SAVE_FAILURE = 'TRANSLATION_SAVE_FAILURE';
export const TRANSLATION_UPDATE_REQUEST = 'TRANSLATION_UPDATE_REQUEST';
export const TRANSLATION_UPDATE_SUCCESS = 'TRANSLATION_UPDATE_SUCCESS';
export const TRANSLATION_UPDATE_FAILURE = 'TRANSLATION_UPDATE_FAILURE';
export const TRANSLATIONS_GET_REQUEST = 'TRANSLATIONS_GET_REQUEST';
export const TRANSLATIONS_GET_SUCCESS = 'TRANSLATIONS_GET_SUCCESS';
export const TRANSLATIONS_GET_FAILURE = 'TRANSLATIONS_GET_FAILURE';
export const TRANSLATION_SET_DELETE_STATE = 'TRANSLATION_SET_DELETE_STATE';
export const TRANSLATION_DELETE_REQUEST = 'TRANSLATION_DELETE_REQUEST';
export const TRANSLATION_DELETE_SUCCESS = 'TRANSLATION_DELETE_SUCCESS';
export const TRANSLATION_DELETE_FAILURE = 'TRANSLATION_DELETE_FAILURE';
export const TRANSLATION_CLEAR_DELETE_STATE = 'TRANSLATION_CLEAR_DELETE_STATE';
export const TRANSLATION_HIDE_ERRORS = 'TRANSLATION_HIDE_ERRORS';
export const TRANSLATION_SEARCH_REQUEST = 'TRANSLATION_SEARCH_REQUEST';
export const TRANSLATION_SEARCH_SUCCESS = 'TRANSLATION_SEARCH_SUCCESS';
export const TRANSLATION_SEARCH_FAILURE = 'TRANSLATION_SEARCH_FAILURE';

export type TranslationRequestAction = {
    +type: 'TRANSLATION_REQUEST',
};

export type TranslationSuccessAction = {
    +type: 'TRANSLATION_SUCCESS',
    +payload: TranslationResponse,
};

export type TranslationFailureAction = {
    +type: 'TRANSLATION_FAILURE',
    +payload: ErrorObject,
};

export type TranslationClearStateAction = {
    +type: 'TRANSLATION_CLEAR_STATE',
};

export type TranslationRemovePronunciationRequestAction = {
    +type: 'TRANSLATION_REMOVE_PRONUNCIATION_REQUEST',
};

export type TranslationRemovePronunciationFailureAction = {
    +type: 'TRANSLATION_REMOVE_PRONUNCIATION_FAILURE',
    +payload: ErrorObject,
};

export type TranslationImageRequestAction = {
    +type: 'TRANSLATION_IMAGE_REQUEST',
};

export type TranslationImageSuccessAction = {
    +type: 'TRANSLATION_IMAGE_SUCCESS',
    +payload: ImageResponse,
};

export type TranslationImageFailureAction = {
    +type: 'TRANSLATION_IMAGE_FAILURE',
    +payload: ErrorObject,
};

export type TranslationSaveRequestAction = {
    +type: 'TRANSLATION_SAVE_REQUEST',
};

export type TranslationSaveSuccessAction = {
    +type: 'TRANSLATION_SAVE_SUCCESS',
    +payload: TranslationResponse,
};

export type TranslationSaveFailureAction = {
    +type: 'TRANSLATION_SAVE_FAILURE',
    +payload: ErrorObject,
};

export type TranslationUpdateRequestAction = {
    +type: 'TRANSLATION_UPDATE_REQUEST',
};

export type TranslationUpdateSuccessAction = {
    +type: 'TRANSLATION_UPDATE_SUCCESS',
    +payload: TranslationResponse,
};

export type TranslationUpdateFailureAction = {
    +type: 'TRANSLATION_UPDATE_FAILURE',
    +payload: ErrorObject,
};

export type TranslationsGetRequestAction = {
    +type: 'TRANSLATIONS_GET_REQUEST',
};

export type TranslationsGetSuccessAction = {
    +type: 'TRANSLATIONS_GET_SUCCESS',
    +payload: TranslationsList,
};

export type TranslationsGetFailureAction = {
    +type: 'TRANSLATIONS_GET_FAILURE',
    +payload: ErrorObject,
};

export type TranslationSetDeleteStateAction = {
    +type: 'TRANSLATION_SET_DELETE_STATE',
    +payload: Translation,
};

export type TranslationDeleteRequestAction = {
    +type: 'TRANSLATION_DELETE_REQUEST',
};

export type TranslationDeleteSuccessAction = {
    +type: 'TRANSLATION_DELETE_SUCCESS',
};

export type TranslationDeleteFailureAction = {
    +type: 'TRANSLATION_DELETE_FAILURE',
    +payload: ErrorObject,
};

export type TranslationClearDeleteStateAction = {
    +type: 'TRANSLATION_CLEAR_DELETE_STATE',
};

export type TranslationHideErrorsAction = {
    +type: 'TRANSLATION_HIDE_ERRORS',
};

export type TranslationSearchRequestAction = {
    +type: 'TRANSLATION_SEARCH_REQUEST',
};

export type TranslationSearchSuccessAction = {
    +type: 'TRANSLATION_SEARCH_SUCCESS',
    +payload: TranslationsList,
};

export type TranslationSearchFailureAction = {
    +type: 'TRANSLATION_SEARCH_FAILURE',
    +payload: ErrorObject,
};
