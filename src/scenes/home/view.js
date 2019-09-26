// @flow

import * as React from 'react';
import {
    TranslationView,
    TextField,
    ButtonGreen,
    OverlayLoading,
    OverlayError,
} from '../../components';
import type {
    ErrorObject,
    FormFieldString,
    TranslationResponse,
    TranslationSaveRequest,
} from '../../types';
import './style.css';

type Props = {
    translation: ?TranslationResponse,
    translationGetLoading: boolean,
    searchField: FormFieldString,
    translationSaveLoading: boolean,
    translationSaveError: ?ErrorObject,
    translationUpdateLoading: boolean,
    translationUpdateError: ?ErrorObject,
    translationGet: (word: string) => *,
    removePronunciation: (word: string) => *,
    translationSave: (data: TranslationSaveRequest) => *,
    translationUpdate: (data: TranslationSaveRequest) => *,
    translationHideErrors: () => *,
    clearSearchFiled: (id: string, value: string) => *,
};

export default class Home extends React.Component<Props> {
    searchHandler = () => {
        const { searchField } = this.props;

        if (searchField.value.length) {
            this.props.translationGet(searchField.value);
        }
    };

    translationSave = (data: TranslationSaveRequest) => {
        if (data.id) {
            this.props.translationUpdate(data);
        } else {
            this.props.translationSave(data);
        }
    };

    translationClose = () => {
        const {
            translation,
            searchField,
        } = this.props;

        if (translation && !translation.id) {
            this.props.removePronunciation(translation.word);
        }

        this.props.clearSearchFiled(searchField.id, '');
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
                    onSubmit={this.searchHandler}
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
        const {
            translationSaveLoading,
            translationSaveError,
            translationUpdateLoading,
            translationUpdateError,
        } = this.props;
        const translationManipulateLoading = translationSaveLoading || translationUpdateLoading;
        const translationManipulateError = translationSaveError || translationUpdateError;

        return (
            <div className="home-container">
                {this.renderForm()}
                <TranslationView
                    onClose={this.translationClose}
                    onWordSelect={this.translationSave}
                />
                { translationManipulateLoading && <OverlayLoading /> }
                { translationManipulateError && (
                    <OverlayError
                        message={translationManipulateError.message}
                        onClick={this.props.translationHideErrors}
                    />
                ) }
            </div>
        );
    }
}
