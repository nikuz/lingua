// @flow

import * as React from 'react';
import {
    TranslationView,
    TextField,
    ButtonGreen,
    Loading,
} from '../../components';
import type {
    ErrorObject,
    TranslationResponse,
    FormFieldString,
} from '../../types';
import './style.css';

type Props = {
    translationGetLoading: boolean,
    translation: TranslationResponse,
    translationGetError: ErrorObject,
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
                <div className="sf-input-wrapper">
                    <TextField
                        type="text"
                        id={searchField.id}
                        value={searchField.value}
                        className="sf-input"
                    />
                    { translationGetLoading && (
                        <div className="sf-loading">
                            <Loading size="small" />
                        </div>
                    ) }
                </div>
                <ButtonGreen
                    disabled={isSubmitDisabled}
                    className="sf-submit"
                    onClick={this.searchHandler}
                >
                    Translate
                </ButtonGreen>
            </div>
        );
    };

    render() {
        const {
            translation,
            translationGetError,
        } = this.props;
        const error = translationGetError;

        return (
            <div className="home-container">
                {this.renderForm()}
                { translation && <TranslationView /> }
                {error && (
                    <div>
                        {error.message}
                    </div>
                )}
            </div>
        );
    }
}
