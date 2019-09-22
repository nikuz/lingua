// @flow

import type { BrowserHistory } from 'history/createBrowserHistory';
import type { AppReducerState } from '../reducers/app';

export type StoreState = {
    router: BrowserHistory,
    app: AppReducerState,
};
