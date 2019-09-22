// @flow
import {
    TRANSLATION_REQUEST,
    TRANSLATION_SUCCESS,
    TRANSLATION_FAILURE,
} from '../types/actions/translation';
import type {
    TranslationRequestAction,
    TranslationSuccessAction,
    TranslationFailureAction,
    ErrorObject,
    TranslationResponse,
} from '../types';

export type TranslationReducerState = {
    getLoading: boolean,
    translation: ?TranslationResponse,
    getError: ?ErrorObject,
};

const initialState: TranslationReducerState = {
    getLoading: false,
    translation: null,
    getError: null,
};

type Action =
    TranslationRequestAction
    | TranslationSuccessAction
    | TranslationFailureAction;

export default function translationReducer(
    state: TranslationReducerState = initialState,
    action: Action
): TranslationReducerState {
    switch (action.type) {
        case TRANSLATION_REQUEST:
            return {
                ...state,
                getLoading: true,
                getError: null,
            };

        case TRANSLATION_SUCCESS:
            return {
                ...state,
                getLoading: false,
                translation: action.payload,
            };

        case TRANSLATION_FAILURE:
            return {
                ...state,
                getLoading: false,
                getError: action.payload,
            };

        default:
            (action: empty); // eslint-disable-line
            return state;
    }
}
