// @flow

import * as React from 'react';
import classNames from 'classnames';
import { ButtonBlue } from '../button';
import Loading from '../loading';
import './style.css';

type Props = {
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
        const {
            size,
            loading,
        } = this.props;

        const className = classNames(
            'float-button',
            loading && 'round',
            size,
            this.props.className
        );

        if (loading) {
            return (
                <ButtonBlue
                    disabled
                    className={className}
                >
                    <Loading size="small" />
                </ButtonBlue>
            );
        }

        return (
            <ButtonBlue
                onClick={this.clickHandler}
                leftIcon="plus"
                leftIconClassName="float-button-icon"
                className={className}
            />
        );
    }
}
