// @flow

import { createSelector } from 'reselect';
import type { BrowserLocation } from 'history/createBrowserHistory';
import {
    appConstants,
    routerConstants,
} from '../constants';
import type { StoreState } from '../store/type';

const getLocationPath: (StoreState) => string = createSelector(
    (state: StoreState): BrowserLocation => state.router.location,
    (location) => location.pathname
);

// ----------------
// public methods
// ----------------

export const getIPGetterUrl = (): string => (
    process.env.API_GETTER_URL || ''
);

export const getApiUrl: (StoreState) => string = createSelector(
    (state: StoreState): string => state.app.apiIP,
    (apiIP: string) => `http://${apiIP}:${appConstants.apiPort}`
);

export const isOnHomePage: (StoreState) => boolean = createSelector(
    getLocationPath,
    (path) => path === routerConstants.HOME
);
