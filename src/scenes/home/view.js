// @flow

import * as React from 'react';
import {
    TranslationView,
    TextField,
    ButtonGreen,
} from '../../components';
import type { FormFieldString } from '../../types';
import './style.css';

type Props = {
    translationGetLoading: boolean,
    searchField: FormFieldString,
    translationGet: (word: string) => *,
};

export default class Home extends React.Component<Props> {
    searchHandler = () => {
        const { searchField } = this.props;

        this.props.translationGet(searchField.value);
    };

    renderForm = () => {
        const {
            translationGetLoading,
            searchField,
        } = this.props;
        const isSubmitDisabled = !searchField.value.length || translationGetLoading;

        return (
            <div className="search-form">
                <TextField
                    type="text"
                    id={searchField.id}
                    value={searchField.value}
                    spellcheck={false}
                    withClearButton
                    autoFocus
                    withLoading={translationGetLoading}
                    className="sf-input"
                />
                <ButtonGreen
                    disabled={isSubmitDisabled}
                    className="sf-submit"
                    text="Translate"
                    onClick={this.searchHandler}
                />
            </div>
        );
    };

    render() {
        return (
            <div className="home-container">
                {this.renderForm()}
                <TranslationView />
            </div>
        );
    }
}
