// @flow

import * as React from 'react';
import {
    Loading,
    OverlayError,
} from '../../components';
import type { ErrorObject } from '../../types';
import './style.css';

type Props = {
    apiIPLoading: boolean,
    apiIPError: ?ErrorObject,
    getApiIP: () => *,
    children: React.Node,
};

type State = {
    globalError: boolean,
};

export default class Launcher extends React.PureComponent<Props, State> {
    state = {
        globalError: false,
    };

    componentDidMount() {
        this.props.getApiIP();
        this.changeViewportSize();
        window.addEventListener('orientationchange', this.changeViewportSize);
    }

    componentDidCatch() {
        this.setState({
            globalError: true,
        });
    }

    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.changeViewportSize);
    }

    changeViewportSize = () => {
        // set viewport size to prevent android viewport size change on keyboard appear
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport instanceof HTMLMetaElement) {
            setTimeout(() => {
                viewport.setAttribute(
                    'content',
                    `width=${window.innerWidth}, height=${window.innerHeight}, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0`
                );
            }, 200);
        }
    };

    hideGlobalError = () => {
        window.location.reload();
    };

    render() {
        const {
            apiIPLoading,
            apiIPError,
        } = this.props;
        const { globalError } = this.state;

        if (apiIPLoading) {
            return (
                <div id="launcher">
                    <div id="launcher-loading">
                        <Loading />
                        <div id="launcher-loading-text">
                            Just hidden text. It needed to preload fonts
                            <span className="thin">Thin</span>
                            <span className="bold">Bold</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (apiIPError) {
            return (
                <div id="launcher">
                    {apiIPError.message}
                </div>
            );
        }

        if (globalError) {
            return (
                <OverlayError
                    message="Some error occurred"
                    onClick={this.hideGlobalError}
                />
            );
        }

        return (
            <div id="launcher">
                {this.props.children}
                { globalError && (
                    <OverlayError
                        message="Some error occurred"
                        onClick={this.hideGlobalError}
                    />
                ) }
            </div>
        );
    }
}
