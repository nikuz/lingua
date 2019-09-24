// @flow

import type { ErrorObject } from '../common';
import type { TranslationResponse } from '../translation';

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
    +payload: string,
};

export type TranslationImageFailureAction = {
    +type: 'TRANSLATION_IMAGE_FAILURE',
    +payload: ErrorObject,
};
