// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import './style.css';

type Props = {
    size?: string,
    className?: string | { [className: string]: * },
};

export default function Loading(props: Props) {
    const { size } = props;
    const className = classNames(
        'loading-icon',
        size === 'small' && 'small',
        size === 'big' && 'big',
        props.className
    );

    return (
        <Icon src="loading" className={className} />
    );
}
