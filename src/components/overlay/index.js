// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Loading from '../loading';
import {
    ButtonOrange,
    ButtonRed,
    ButtonTransparent,
} from '../button';
import { commonUtils } from '../../utils';
import './style.css';

const WITH_OVERLAY_CLASSNAME = 'with-overlay';

type Props = {
    className?: string | { [className: string]: * },
    contentClassName?: string | { [className: string]: * },
    blockerClassName?: string | { [className: string]: * },
    message?: string | Array<string>,
    children?: React.Node,
    autoHideTime?: number,
    withCloseButton?: boolean,
    closeIconClassName?: string | { [className: string]: * },
    icon?: string, //eslint-disable-line
    iconClassName?: string, //eslint-disable-line
    acceptText?: string, //eslint-disable-line
    cancelText?: string, //eslint-disable-line
    onAcceptButtonDisabled?: boolean, //eslint-disable-line
    primary?: boolean, //eslint-disable-line
    withBlurredBackground?: boolean,
    onAcceptClick?: () => *, //eslint-disable-line
    autoHideCallback?: () => *,
    onClick?: () => *,
    onClose?: () => *,
    onCancelClick?: () => *,
};

export default class Overlay extends React.PureComponent<Props> {
    static defaultProps = {
        withCloseButton: false,
        primary: false,
        withBlurredBackground: false,
    };

    timer: TimeoutID;

    componentDidMount() {
        const {
            autoHideTime,
            autoHideCallback,
            primary,
            withBlurredBackground,
        } = this.props;

        if (autoHideTime && autoHideCallback) {
            this.timer = setTimeout(autoHideCallback, autoHideTime);
        }

        const documentElement = document.documentElement;
        if (primary && documentElement) {
            documentElement.classList.add(WITH_OVERLAY_CLASSNAME);
        }

        if (withBlurredBackground) {
            commonUtils.makeBackgroundBlurred(true);
        }

        document.addEventListener('keydown', this.onKeyDownHandler);
    }

    componentWillUnmount() {
        const {
            onClose,
            primary,
            withBlurredBackground,
        } = this.props;
        if (this.timer) {
            clearTimeout(this.timer);
        }

        const documentElement = document.documentElement;
        if (primary && documentElement) {
            documentElement.classList.remove(WITH_OVERLAY_CLASSNAME);
        }

        if (onClose instanceof Function) {
            onClose();
        }

        if (withBlurredBackground) {
            commonUtils.makeBackgroundBlurred(false);
        }

        document.removeEventListener('keydown', this.onKeyDownHandler);
    }

    containerClickHandler = () => {
        const {
            onClick,
            onCancelClick,
            autoHideCallback,
        } = this.props;
        const clickHandler = onClick || autoHideCallback || onCancelClick;

        if (clickHandler instanceof Function) {
            clickHandler();
        }
    };

    onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.containerClickHandler();
        }
    };

    render() {
        const body = document.body;
        if (!body) {
            return null;
        }
        const { children } = this.props;
        const { withCloseButton } = this.props;
        let {
            className,
            contentClassName,
            blockerClassName,
            message,
            closeIconClassName,
        } = this.props;

        className = classNames(
            'overlay',
            className
        );
        contentClassName = classNames(
            'overlay-content',
            withCloseButton && 'relative',
            contentClassName
        );
        blockerClassName = classNames(
            'blocker',
            blockerClassName
        );
        closeIconClassName = classNames(
            'overlay-close-button-icon',
            closeIconClassName
        );
        if (children) {
            message = children;
        }

        return ReactDOM.createPortal(
            (
                <div className="overlay-container">
                    <div className={className}>
                        <div onClick={this.containerClickHandler} className={blockerClassName} />
                        <div className={contentClassName}>
                            { withCloseButton && (
                                <ButtonTransparent
                                    className="overlay-close-button"
                                    leftIcon="close"
                                    leftIconClassName={closeIconClassName}
                                    onClick={this.containerClickHandler}
                                />
                            ) }
                            { message }
                        </div>
                    </div>
                </div>
            ),
            body
        );
    }
}

export const OverlayMessage = (props: Props) => {
    const extendedProps: Props = {
        ...props,
        className: 'overlay-message no-blur',
        contentClassName: 'overlay-message-content',
    };

    return <Overlay {...extendedProps} />;
};

export const OverlayError = (props: Props) => {
    const { children } = props;
    let { message } = props;
    if (children) {
        message = children;
    }
    const extendedProps: Props = {
        ...props,
        className: 'overlay-error no-blur',
        contentClassName: 'overlay-error-content',
    };

    return (
        <Overlay {...extendedProps}>
            <div>
                <Icon src="warning" className="overlay-error-icon" />
                <p className="overlay-error-text">
                    { message }
                </p>
                <ButtonOrange
                    text="Ok"
                    className="overlay-error-btn"
                    onClick={props.onClick || props.autoHideCallback}
                />
            </div>
        </Overlay>
    );
};

export const OverlayLoading = (props: Props) => {
    const extendedProps: Props = {
        ...props,
        className: 'overlay-loading no-blur',
        contentClassName: 'overlay-loading-content',
    };

    return (
        <Overlay {...extendedProps}>
            <Loading size="big" />
        </Overlay>
    );
};

export const OverlayConfirm = (props: Props) => {
    const extendedProps: Props = {
        ...props,
        className: 'overlay-confirm no-blur',
        contentClassName: 'overlay-confirm-content',
    };

    return (
        <Overlay {...extendedProps}>
            {props.icon && (
                <div className="overlay-confirm-icon-wrapper">
                    <Icon
                        src={props.icon}
                        className={
                            classNames('overlay-confirm-icon', props.iconClassName)
                        }
                    />
                </div>
            )}
            {props.message && (
                <p className="overlay-confirm-text">
                    {props.message}
                </p>
            )}
            {props.children}
            <ButtonRed
                text={props.acceptText}
                className="form-submit-button"
                disabled={props.onAcceptButtonDisabled || false}
                onClick={props.onAcceptClick}
            />
            <ButtonTransparent
                text={props.cancelText}
                className="form-submit-button overlay-confirm-cancel-btn"
                onClick={props.onCancelClick}
            />
        </Overlay>
    );
};
