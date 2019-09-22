// @flow

import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import { routerConstants } from './constants';

import Launcher from './scenes/launcher';
import Home from './scenes/home';

export default () => (
    <ConnectedRouter history={history}>
        <Launcher>
            <Switch>
                <Route
                    exact
                    path={routerConstants.HOME}
                    component={Home}
                />
            </Switch>
        </Launcher>
    </ConnectedRouter>
);
