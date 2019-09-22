// @flow

import * as React from 'react';
import classNames from 'classnames';
import { appConstants } from '../../constants';
import './style.css';

const {
    BASE_WIDTH,
    BASE_HEIGHT,
    MIN_ASPECT_RATIO,
    MAX_ASPECT_RATIO,
} = appConstants;

type Props = {
    id?: string,
    className?: string | { [className: string]: * },
    children: React.Node,
    'data-id'?: string,
};

class ResizableContainer extends React.PureComponent<Props, void> {
    containerEl: ?HTMLElement;

    componentDidMount() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    resizeHandler = (): void => {
        const containerEl = this.containerEl;
        const documentElement = document.documentElement;
        if (!containerEl || !documentElement) {
            return;
        }

        const dWidth = window.innerWidth;
        const dHeight = window.innerHeight;
        const curAspectRatio = dWidth / dHeight;
        const style = {
            width: dWidth,
            height: dHeight,
        };
        if (curAspectRatio < MIN_ASPECT_RATIO) {
            style.width = dHeight * MIN_ASPECT_RATIO;
        } else if (curAspectRatio > MAX_ASPECT_RATIO) {
            style.width = dHeight * MAX_ASPECT_RATIO;
        }

        if (style.width > dWidth) {
            style.width = dWidth;
            style.height = dWidth / MIN_ASPECT_RATIO;
        }

        Object.keys(style).forEach((item) => {
            containerEl.style.setProperty(item, `${style[item]}px`);
        });

        if (this.props['data-id'] === 'launcher') {
            const fontSize = Math.min((dWidth / BASE_WIDTH), (dHeight / BASE_HEIGHT));
            documentElement.style.fontSize = `${fontSize}px`;
        }
    };

    render() {
        const {
            id,
            children,
        } = this.props;
        let { className } = this.props;

        className = classNames(
            'resizable-container',
            className
        );

        return (
            <div
                className={className}
                ref={(el) => this.containerEl = el}
                id={id}
                data-id={this.props['data-id']}
            >
                { children }
            </div>
        );
    }
}

export default ResizableContainer;
