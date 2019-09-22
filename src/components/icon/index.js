// @flow

import * as React from 'react';
import '../../assets/icons';
import './style.css';

type Props = {
    src: string,
    className?: string | { [className: string]: * },
    id?: string,
    style?: { [$Keys<CSSStyleDeclaration>]: string | number },
};

export default function Icon(props: Props) {
    const {
        src,
        id,
        className,
        style,
    } = props;

    return (
        <svg
            style={style}
            id={id}
            className={className}
        >
            <use xlinkHref={`#${src}`} />
        </svg>
    );
}
