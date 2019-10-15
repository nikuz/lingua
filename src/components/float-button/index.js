// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
    ButtonBlue,
    ButtonRed,
} from '../button';
import Loading from '../loading';
import './style.css';

type Props = {
    icon: string,
    color: string,
    size?: string,
    loading?: boolean,
    className?: string | { [className: string]: * },
    onClick: (e: MouseEvent) => *,
};

export default class FloatButton extends React.PureComponent<Props> {
    static defaultProps = {
        loading: false,
    };

    clickHandler = (e: Event) => {
        if (this.props.onClick instanceof Function) {
            this.props.onClick(e);
        }
    };

    render() {
        const body = document.body;
        if (!body) {
            return null;
        }

        const {
            icon,
            size,
            loading,
            color,
        } = this.props;
        let ButtonComponent = ButtonBlue;

        if (color === 'red') {
            ButtonComponent = ButtonRed;
        }

        const className = classNames(
            'float-button',
            loading && 'round',
            size,
            this.props.className
        );

        return ReactDOM.createPortal(
            (
                <ButtonComponent
                    onClick={this.clickHandler}
                    leftIcon={!loading ? icon : ''}
                    disabled={loading}
                    leftIconClassName="float-button-icon"
                    className={className}
                >
                    { loading && <Loading size="small" /> }
                </ButtonComponent>
            ),
            body
        );
    }
}
