// @flow

import * as React from 'react';
import {
    ResizableContainer,
    Loading,
} from '../../components';
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
                <ResizableContainer id="launcher" data-id="launcher">
                    <div id="launcher-loading">
                        <Loading />
                        <div id="launcher-loading-text">
                            Just hidden text. It needed to preload fonts
                            <span className="thin">Thin</span>
                            <span className="bold">Bold</span>
                        </div>
                    </div>
                </ResizableContainer>
            );
        }

        if (apiIPError) {
            return (
                <ResizableContainer id="launcher" data-id="launcher">
                    {apiIPError.message}
                </ResizableContainer>
            );
        }

        return (
            <ResizableContainer id="launcher" data-id="launcher">
                {this.props.children}
            </ResizableContainer>
        );
    }
}
