// @flow

import * as React from 'react';
import {
    TranslationView,
    OverlayLoading,
    OverlayError,
    Search,
    TranslationsList,
} from '../../components';
import { TRANSLATIONS_LIST_PAGE_SIZE } from '../../constants/translations';
import type {
    ErrorObject,
    FormFieldString,
    TranslationResponse,
    TranslationSaveRequest,
    Translation,
} from '../../types';
import './style.css';

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
    translationsList: TranslationsList,
    getListError: ?ErrorObject,
    translationGet: (word: string) => *,
    removePronunciation: (word: string) => *,
    translationSave: (data: TranslationSaveRequest) => *,
    translationUpdate: (data: TranslationSaveRequest) => Promise<*>,
    translationHideErrors: () => *,
    clearSearchFiled: (id: string, value: string) => *,
    getTranslations: (from: number, to: number) => *,
    translationClearState: () => *,
};

type State = {
    from: number,
    to: number,
    selectedTranslation: ?Translation,
};

export default class Home extends React.Component<Props, State> {
    state = {
        from: 0,
        to: TRANSLATIONS_LIST_PAGE_SIZE,
        selectedTranslation: null,
    };

    componentDidMount() {
        const { from, to } = this.state;
        this.props.getTranslations(from, to);
    }

    pager = () => (
        this.setState((prevState) => {
            const from = prevState.from + TRANSLATIONS_LIST_PAGE_SIZE;
            const to = prevState.to + TRANSLATIONS_LIST_PAGE_SIZE;

            this.props.getTranslations(
                from,
                to
            );

            return {
                from,
                to,
            };
        })
    );

    selectTranslationFromList = (translation: Translation) => {
        this.setState({
            selectedTranslation: translation,
        });
    };

    searchHandler = () => {
        const { searchField } = this.props;
        console.log(searchField);

        if (searchField.value.length) {
            this.props.translationGet(searchField.value);
        }
    };

    translationSave = (data: TranslationSaveRequest) => {
        const { from, to } = this.state;
        let saveMethod = this.props.translationSave;
        if (data.id) {
            saveMethod = this.props.translationUpdate;
        }

        saveMethod(data).then(() => {
            this.props.getTranslations(from, to);
            this.translationClose();
        });
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
        this.props.translationClearState();
        this.setState({
            selectedTranslation: null,
        });
    };

    render() {
        const {
            searchField,
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
        let { translation } = this.props;
        const { selectedTranslation } = this.state;
        const translationManipulateLoading = translationSaveLoading
            || translationUpdateLoading
            || getListLoading;
        const translationManipulateError = getError
            || translationSaveError
            || translationUpdateError
            || getListError;
        const isSearchDisabled = !searchField.value.length || translationGetLoading;

        if (!translation && selectedTranslation) {
            translation = selectedTranslation;
        }

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
                <TranslationsList
                    data={translationsList.translations}
                    onScroll={this.pager}
                    onSelect={this.selectTranslationFromList}
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
