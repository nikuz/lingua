// @flow

import * as React from 'react';
import {
    TextField,
    ButtonGreen,
    Loading,
} from '../../components';
import type {
    ErrorObject,
    // TranslationResponse,
    FormFieldString,
} from '../../types';
import './style.css';

type Props = {
    translationGetLoading: boolean,
    // translation: TranslationResponse,
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
            translationGetError,
            searchField,
        } = this.props;
        const error = translationGetError;
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
                </div>
                <div className="sf-submit-wrapper">
                    <ButtonGreen
                        disabled={isSubmitDisabled}
                        className="sf-submit"
                        onClick={this.searchHandler}
                    >
                        Translate
                    </ButtonGreen>
                    { translationGetLoading && (
                        <Loading
                            size="small"
                            className="sf-loading"
                        />
                    ) }
                </div>
                {error && (
                    <div>
                        {error.message}
                    </div>
                )}
            </div>
        );
    };

    render() {
        return (
            <div className="home-container">
                {this.renderForm()}
            </div>
        );
    }
}
