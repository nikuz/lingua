// @flow

import {
    applyMiddleware,
    createStore,
    compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createRootReducer from '../reducers';

export const history = createBrowserHistory();

const middlewares = [
    thunkMiddleware,
    routerMiddleware(history),
];

if (process.env.NODE_ENV !== 'production') {
    const reduxLogger = require('redux-logger'); // eslint-disable-line global-require
    middlewares.push(reduxLogger.createLogger());
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

// $FlowFixMe
export default createStore(
    createRootReducer(history),
    composeEnhancer(
        applyMiddleware(...middlewares)
    )
);
