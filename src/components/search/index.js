// @flow
import * as React from 'react';
import { ButtonGreen } from '../button';
import TextField from '../text-field';
import './style.css';

type Props = {
    id: string,
    value: string,
    loading: boolean,
    disabled: boolean,
    onSubmit: () => *,
    onClick: () => *,
};

export default class Search extends React.Component<Props> {
    render() {
        const {
            id,
            value,
            loading,
            disabled,
        } = this.props;

        return (
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
                    onSubmit={this.props.onSubmit}
                />
                <ButtonGreen
                    disabled={disabled}
                    className="sf-submit"
                    text="Translate"
                    onClick={this.props.onClick}
                />
            </div>
        );
    }
}
