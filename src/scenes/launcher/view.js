// @flow

import * as React from 'react';
import { Loading } from '../../components';
import type { ErrorObject } from '../../types';
import './style.css';

type Props = {
    apiIPLoading: boolean,
    apiIPError: ?ErrorObject,
    getApiIP: () => *,
    children: React.Node,
};

export default class Launcher extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.getApiIP();
    }

    render() {
        const {
            apiIPLoading,
            apiIPError,
        } = this.props;

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

        return (
            <div id="launcher">
                {this.props.children}
            </div>
        );
    }
}
