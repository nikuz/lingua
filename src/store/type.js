// @flow

import type { BrowserHistory } from 'history/createBrowserHistory';
import type { AppReducerState } from '../reducers/app';
import type { FormReducerState } from '../reducers/form';
import type { TranslationReducerState } from '../reducers/translation';

export type StoreState = {
    router: BrowserHistory,
    app: AppReducerState,
    form: FormReducerState,
    translation: TranslationReducerState,
};
