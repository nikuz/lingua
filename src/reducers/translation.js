// @flow
import {
    TRANSLATION_REQUEST,
    TRANSLATION_SUCCESS,
    TRANSLATION_FAILURE,
    TRANSLATION_CLEAR_STATE,
    TRANSLATION_REMOVE_PRONUNCIATION_REQUEST,
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
    TRANSLATION_HIDE_ERRORS,
} from '../types/actions/translation';
import type {
    TranslationRequestAction,
    TranslationSuccessAction,
    TranslationFailureAction,
    TranslationClearStateAction,
    TranslationRemovePronunciationRequestAction,
    TranslationRemovePronunciationFailureAction,
    TranslationImageRequestAction,
    TranslationImageSuccessAction,
    TranslationImageFailureAction,
    TranslationSaveRequestAction,
    TranslationSaveSuccessAction,
    TranslationSaveFailureAction,
    TranslationUpdateRequestAction,
    TranslationUpdateSuccessAction,
    TranslationUpdateFailureAction,
    TranslationHideErrorsAction,
    ErrorObject,
    TranslationResponse,
} from '../types';

export type TranslationReducerState = {
    getLoading: boolean,
    translation: ?TranslationResponse,
    getError: ?ErrorObject,
    pronunciationRemoveLoading: boolean,
    pronunciationRemoveError: ?ErrorObject,
    imageLoading: boolean,
    image: ?string,
    imageError: ?ErrorObject,
    saveLoading: boolean,
    saveError: ?ErrorObject,
    updateLoading: boolean,
    updateError: ?ErrorObject,
};

const initialState: TranslationReducerState = {
    getLoading: false,
    translation: null,
    getError: null,
    pronunciationRemoveLoading: false,
    pronunciationRemoveError: null,
    imageLoading: false,
    image: null,
    imageError: null,
    saveLoading: false,
    saveData: null,
    saveError: null,
    updateLoading: false,
    updateError: null,
};

type Action =
    TranslationRequestAction
    | TranslationSuccessAction
    | TranslationFailureAction
    | TranslationClearStateAction
    | TranslationRemovePronunciationRequestAction
    | TranslationRemovePronunciationFailureAction
    | TranslationImageRequestAction
    | TranslationImageSuccessAction
    | TranslationImageFailureAction
    | TranslationSaveRequestAction
    | TranslationSaveSuccessAction
    | TranslationSaveFailureAction
    | TranslationUpdateRequestAction
    | TranslationUpdateSuccessAction
    | TranslationUpdateFailureAction
    | TranslationHideErrorsAction;

export default function translationReducer(
    state: TranslationReducerState = initialState,
    action: Action
): TranslationReducerState {
    switch (action.type) {
        case TRANSLATION_REQUEST:
            return {
                ...state,
                getLoading: true,
                translation: null,
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

        case TRANSLATION_REMOVE_PRONUNCIATION_REQUEST:
            return {
                ...state,
                pronunciationRemoveLoading: true,
                pronunciationRemoveError: null,
            };

        case TRANSLATION_REMOVE_PRONUNCIATION_FAILURE:
            return {
                ...state,
                pronunciationRemoveLoading: false,
                pronunciationRemoveError: action.payload,
            };

        case TRANSLATION_IMAGE_REQUEST:
            return {
                ...state,
                imageLoading: true,
                imageError: null,
            };

        case TRANSLATION_IMAGE_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                image: action.payload.image,
            };

        case TRANSLATION_IMAGE_FAILURE:
            return {
                ...state,
                imageLoading: false,
                imageError: action.payload,
            };

        case TRANSLATION_SAVE_REQUEST:
            return {
                ...state,
                saveLoading: true,
                saveError: null,
            };

        case TRANSLATION_SAVE_SUCCESS:
            return {
                ...state,
                saveLoading: false,
                translation: action.payload,
            };

        case TRANSLATION_SAVE_FAILURE:
            return {
                ...state,
                saveLoading: false,
                saveError: action.payload,
            };

        case TRANSLATION_UPDATE_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null,
            };

        case TRANSLATION_UPDATE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                translation: action.payload,
            };

        case TRANSLATION_UPDATE_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload,
            };

        case TRANSLATION_HIDE_ERRORS:
            return {
                ...state,
                updateError: null,
                saveError: null,
            };

        case TRANSLATION_CLEAR_STATE:
            return {
                ...state,
                ...initialState,
            };

        default:
            (action: empty); // eslint-disable-line
            return state;
    }
}
