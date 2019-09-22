// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// css
import './assets/styles/vars.css';
import './assets/styles/base.css';
import './assets/styles/common.css';

import store from './store';
import Routes from './routes';

const rootEl = document.getElementById('root');
if (rootEl) {
    ReactDOM.render(
        <ReduxProvider store={store}>
            <Routes />
        </ReduxProvider>,
        rootEl
    );
}
