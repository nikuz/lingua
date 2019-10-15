// @flow

import { TRANSLATIONS_LIST_PAGE_SIZE } from '../constants/translations';
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
    TRANSLATION_HIDE_ERRORS,
    TRANSLATION_SET_DELETE_STATE,
    TRANSLATION_DELETE_REQUEST,
    TRANSLATION_DELETE_SUCCESS,
    TRANSLATION_DELETE_FAILURE,
    TRANSLATION_CLEAR_DELETE_STATE,
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
    TranslationToggleImagePickerVisibilityAction,
    TranslationSelectImageAction,
    TranslationSaveRequestAction,
    TranslationSaveSuccessAction,
    TranslationSaveFailureAction,
    TranslationUpdateRequestAction,
    TranslationUpdateSuccessAction,
    TranslationUpdateFailureAction,
    TranslationsGetRequestAction,
    TranslationsGetSuccessAction,
    TranslationsGetFailureAction,
    TranslationsClearListAction,
    TranslationHideErrorsAction,
    TranslationSetDeleteStateAction,
    TranslationDeleteRequestAction,
    TranslationDeleteSuccessAction,
    TranslationDeleteFailureAction,
    TranslationClearDeleteStateAction,
    TranslationSearchRequestAction,
    TranslationSearchSuccessAction,
    TranslationSearchFailureAction,
    TranslationSearchClearStateAction,
    TranslationGetRandomWordRequestAction,
    TranslationGetRandomWordSuccessAction,
    TranslationGetRandomWordFailureAction,
    TranslationDeleteRandomWordRequestAction,
    TranslationDeleteRandomWordSuccessAction,
    TranslationDeleteRandomWordFailureAction,
    ErrorObject,
    TranslationResponse,
    Translation,
    TranslationsListType,
} from '../types';

export type TranslationReducerState = {
    getLoading: boolean,
    translation: ?TranslationResponse,
    getError: ?ErrorObject,
    pronunciationRemoveLoading: boolean,
    pronunciationRemoveError: ?ErrorObject,
    imageLoading: boolean,
    image: ?string,
    imagePickerOpened: boolean,
    images: string[],
    imageError: ?ErrorObject,
    saveLoading: boolean,
    saveError: ?ErrorObject,
    updateLoading: boolean,
    updateError: ?ErrorObject,
    getListLoading: boolean,
    translationsList: TranslationsListType,
    getListError: ?ErrorObject,
    translationToDelete: ?Translation,
    deleteLoading: boolean,
    deleteError: ?ErrorObject,
    searchLoading: boolean,
    searchList: TranslationsListType,
    searchError: ?ErrorObject,
    randomWordLoading: boolean,
    randomWord: ?string,
    randomWordError: ?ErrorObject,
    randomWordDeleteLoading: boolean,
    randomWordDeleted: boolean,
    randomWordDeleteError: ?ErrorObject,
    randomWordToDelete: ?string,
};

const initialState: TranslationReducerState = {
    getLoading: false,
    translation: null,
    getError: null,
    pronunciationRemoveLoading: false,
    pronunciationRemoveError: null,
    imageLoading: false,
    image: null,
    imagePickerOpened: false,
    images: [],
    imageError: null,
    saveLoading: false,
    saveData: null,
    saveError: null,
    updateLoading: false,
    updateError: null,
    getListLoading: false,
    translationsList: {
        from: 0,
        to: TRANSLATIONS_LIST_PAGE_SIZE,
        totalAmount: 0,
        translations: [],
    },
    getListError: null,
    translationToDelete: null,
    deleteLoading: false,
    deleteError: null,
    searchLoading: false,
    searchList: {
        from: 0,
        to: TRANSLATIONS_LIST_PAGE_SIZE,
        totalAmount: 0,
        translations: [],
    },
    searchError: null,
    randomWordLoading: false,
    randomWord: null,
    randomWordError: null,
    randomWordDeleteLoading: false,
    randomWordDeleted: false,
    randomWordDeleteError: null,
    randomWordToDelete: null,
};

const mergeTranslationsList = (stateList, newList) => {
    const currentList = { ...stateList };
    const translations = currentList.translations.slice(0);

    if (newList.from < currentList.from) {
        currentList.from = newList.from;
    }
    if (newList.to > currentList.to) {
        currentList.to = newList.to;
    }

    translations.splice(
        newList.from,
        newList.to - newList.from,
        ...newList.translations
    );

    currentList.translations = translations;
    currentList.totalAmount = newList.totalAmount;

    return currentList;
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
    | TranslationToggleImagePickerVisibilityAction
    | TranslationSelectImageAction
    | TranslationSaveRequestAction
    | TranslationSaveSuccessAction
    | TranslationSaveFailureAction
    | TranslationUpdateRequestAction
    | TranslationUpdateSuccessAction
    | TranslationUpdateFailureAction
    | TranslationsGetRequestAction
    | TranslationsGetSuccessAction
    | TranslationsGetFailureAction
    | TranslationsClearListAction
    | TranslationSetDeleteStateAction
    | TranslationDeleteRequestAction
    | TranslationDeleteSuccessAction
    | TranslationDeleteFailureAction
    | TranslationClearDeleteStateAction
    | TranslationHideErrorsAction
    | TranslationSearchRequestAction
    | TranslationSearchSuccessAction
    | TranslationSearchFailureAction
    | TranslationSearchClearStateAction
    | TranslationGetRandomWordRequestAction
    | TranslationGetRandomWordSuccessAction
    | TranslationGetRandomWordFailureAction
    | TranslationDeleteRandomWordRequestAction
    | TranslationDeleteRandomWordSuccessAction
    | TranslationDeleteRandomWordFailureAction;

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
                searchError: null,
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
                image: action.payload.images[0],
                images: action.payload.images,
            };

        case TRANSLATION_IMAGE_FAILURE:
            return {
                ...state,
                imageLoading: false,
                imageError: action.payload,
            };

        case TRANSLATION_IMAGE_TOGGLE_IMAGE_PICKER_VISIBILITY:
            return {
                ...state,
                imagePickerOpened: !state.imagePickerOpened,
            };

        case TRANSLATION_IMAGE_SELECT:
            return {
                ...state,
                image: action.payload,
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

        case TRANSLATIONS_GET_REQUEST:
            return {
                ...state,
                getListLoading: true,
                getListError: null,
            };

        case TRANSLATIONS_GET_SUCCESS:
            return {
                ...state,
                getListLoading: false,
                translationsList: mergeTranslationsList(
                    state.translationsList,
                    action.payload
                ),
            };

        case TRANSLATIONS_GET_FAILURE:
            return {
                ...state,
                getListLoading: false,
                getListError: action.payload,
            };

        case TRANSLATIONS_CLEAR_LIST:
            return {
                ...state,
                translationsList: initialState.translationsList,
            };

        case TRANSLATION_SET_DELETE_STATE:
            return {
                ...state,
                translationToDelete: action.payload,
            };

        case TRANSLATION_DELETE_REQUEST:
            return {
                ...state,
                deleteLoading: false,
                deleteError: null,
            };

        case TRANSLATION_DELETE_SUCCESS: {
            const deletedTranslation = state.translationToDelete;
            const translationsList = state.translationsList.translations.slice(0);
            const searchList = state.searchList.translations.slice(0);

            if (deletedTranslation) {
                const inTranslationsList = translationsList.findIndex((item) => (
                    item.word === deletedTranslation.word
                ));
                const inSearchList = searchList.findIndex((item) => (
                    item.word === deletedTranslation.word
                ));

                if (inTranslationsList !== -1) {
                    translationsList.splice(inTranslationsList, 1);
                }

                if (inSearchList !== -1) {
                    searchList.splice(inSearchList, 1);
                }
            }

            return {
                ...state,
                deleteLoading: false,
                translationToDelete: null,
                translationsList: {
                    ...state.translationsList,
                    translations: translationsList,
                },
                searchList: {
                    ...state.searchList,
                    translations: searchList,
                },
            };
        }

        case TRANSLATION_DELETE_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.payload,
                translationToDelete: null,
            };

        case TRANSLATION_CLEAR_DELETE_STATE:
            return {
                ...state,
                translationToDelete: null,
                randomWordToDelete: null,
            };

        case TRANSLATION_HIDE_ERRORS:
            return {
                ...state,
                getError: null,
                updateError: null,
                saveError: null,
                imageError: null,
                pronunciationRemoveError: null,
                getListError: null,
                deleteError: null,
                searchError: null,
                randomWordError: null,
                randomWordDeleteError: null,
            };

        case TRANSLATION_CLEAR_STATE:
            return {
                ...state,
                translation: null,
                image: null,
                images: [],
                randomWord: null,
                randomWordDeleted: false,
            };

        case TRANSLATION_SEARCH_REQUEST:
            return {
                ...state,
                searchLoading: true,
            };

        case TRANSLATION_SEARCH_SUCCESS:
            return {
                ...state,
                searchLoading: false,
                searchList: mergeTranslationsList(
                    state.searchList,
                    action.payload
                ),
            };

        case TRANSLATION_SEARCH_FAILURE:
            return {
                ...state,
                searchLoading: false,
                searchError: action.payload,
            };

        case TRANSLATION_CLEAR_SEARCH_STATE:
            return {
                ...state,
                searchList: initialState.searchList,
            };

        case TRANSLATION_GET_RANDOM_WORD_REQUEST:
            return {
                ...state,
                randomWordLoading: true,
            };

        case TRANSLATION_GET_RANDOM_WORD_SUCCESS:
            return {
                ...state,
                randomWord: action.payload,
                randomWordLoading: false,
            };

        case TRANSLATION_GET_RANDOM_WORD_FAILURE:
            return {
                ...state,
                randomWordError: action.payload,
                randomWordLoading: false,
            };

        case TRANSLATION_DELETE_RANDOM_WORD_REQUEST:
            return {
                ...state,
                randomWordDeleteLoading: true,
            };

        case TRANSLATION_DELETE_RANDOM_WORD_SUCCESS:
            return {
                ...state,
                randomWordDeleted: true,
                randomWordDeleteLoading: false,
                randomWordToDelete: null,
            };

        case TRANSLATION_DELETE_RANDOM_WORD_FAILURE:
            return {
                ...state,
                randomWordDeleteError: action.payload,
                randomWordDeleteLoading: false,
                randomWordToDelete: null,
            };

        case TRANSLATION_RANDOM_WORD_SET_DELETE_STATE:
            return {
                ...state,
                randomWordToDelete: action.payload,
            };

        default:
            (action: empty); // eslint-disable-line
            return state;
    }
}
