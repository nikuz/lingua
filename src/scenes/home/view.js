// @flow

import * as React from 'react';
import {
    TranslationView,
    OverlayLoading,
    OverlayError,
    Search,
} from '../../components';
import type {
    ErrorObject,
    FormFieldString,
    TranslationResponse,
    TranslationSaveRequest,
} from '../../types';
import './style.css';

const PAGE_SIZE = 20;

type Props = {
    translation: ?TranslationResponse,
    getError: ?ErrorObject,
    translationGetLoading: boolean,
    searchField: FormFieldString,
    translationSaveLoading: boolean,
    translationSaveError: ?ErrorObject,
    translationUpdateLoading: boolean,
    translationUpdateError: ?ErrorObject,
    getListLoading: boolean,
    translationsList: TranslationResponse[],
    getListError: ?ErrorObject,
    translationGet: (word: string) => *,
    removePronunciation: (word: string) => *,
    translationSave: (data: TranslationSaveRequest) => *,
    translationUpdate: (data: TranslationSaveRequest) => *,
    translationHideErrors: () => *,
    clearSearchFiled: (id: string, value: string) => *,
    getTranslations: (from: number, to: number) => *,
};

type State = {
    from: number,
    to: number,
};

export default class Home extends React.Component<Props, State> {
    state = {
        from: 0,
        to: PAGE_SIZE,
    };

    componentDidMount() {
        const { from, to } = this.state;
        this.props.getTranslations(from, to);
    }

    searchHandler = () => {
        const { searchField } = this.props;
        console.log(searchField);

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

    render() {
        const {
            searchField,
            translation,
            translationGetLoading,
            getError,
            translationSaveLoading,
            translationSaveError,
            translationUpdateLoading,
            translationUpdateError,
            getListLoading,
            translationsList,
            getListError,
        } = this.props;
        const translationManipulateLoading = translationSaveLoading
            || translationUpdateLoading
            || getListLoading;
        const translationManipulateError = getError
            || translationSaveError
            || translationUpdateError
            || getListError;
        const isSearchDisabled = !searchField.value.length || translationGetLoading;

        return (
            <div className="home-container">
                <Search
                    id={searchField.id}
                    value={searchField.value}
                    loading={translationGetLoading}
                    disabled={isSearchDisabled}
                    onSubmit={this.searchHandler}
                    onClick={this.searchHandler}
                />
                <TranslationView
                    translation={translation}
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
