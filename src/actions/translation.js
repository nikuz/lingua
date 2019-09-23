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
        }),
    });
};

export const clearState = () => ({
    type: TRANSLATION_CLEAR_STATE,
});
