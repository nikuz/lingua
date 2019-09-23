// @flow

import type { ErrorObject } from '../common';
import type { TranslationResponse } from '../translation';

export const TRANSLATION_REQUEST = 'TRANSLATION_REQUEST';
export const TRANSLATION_SUCCESS = 'TRANSLATION_SUCCESS';
export const TRANSLATION_FAILURE = 'TRANSLATION_FAILURE';
export const TRANSLATION_CLEAR_STATE = 'TRANSLATION_CLEAR_STATE';

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
