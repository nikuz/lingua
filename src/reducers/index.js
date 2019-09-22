// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { BrowserHistory } from 'history/createBrowserHistory';
import appReducer from './app';
import formReducer from './form';
import translationReducer from './translation';

// $FlowFixMe
export default (history: BrowserHistory) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    form: formReducer,
    translation: translationReducer,
});
