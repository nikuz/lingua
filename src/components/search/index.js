// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGreen } from '../button';
import TextField from '../text-field';
import type { TextFieldData } from '../text-field';
import './style.css';

type Props = {
    id: string,
    value: string,
    loading: boolean,
    disabled: boolean,
    onSubmit: (e: KeyboardEvent) => *,
    onClick: (e: MouseEvent) => *,
    onChange: (data: TextFieldData) => *,
};

export default function Search(props: Props) {
    const body = document.body;
    if (!body) {
        return null;
    }

    const {
        id,
        value,
        loading,
        disabled,
    } = props;

    return ReactDOM.createPortal(
        (
            <div className="search-form">
                <TextField
                    type="text"
                    id={id}
                    value={value}
                    spellcheck={false}
                    withClearButton
                    autoFocus
                    withLoading={loading}
                    className="sf-input"
                    onSubmit={props.onSubmit}
                    onChange={props.onChange}
                />
                <ButtonGreen
                    disabled={disabled}
                    className="sf-submit"
                    text="Translate"
                    onClick={props.onClick}
                />
            </div>
        ),
        body
    );
}
