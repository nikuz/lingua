// @flow

import * as React from 'react';
import {
    TranslationView,
    OverlayLoading,
    OverlayError,
    OverlayConfirm,
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
    translationToDelete: ?Translation,
    deleteLoading: boolean,
    deleteError: ?ErrorObject,
    translationGet: (word: string) => *,
    removePronunciation: (word: string) => *,
    translationSave: (data: TranslationSaveRequest) => *,
    translationUpdate: (data: TranslationSaveRequest) => Promise<*>,
    translationHideErrors: () => *,
    clearSearchFiled: (id: string, value: string) => *,
    getTranslations: (from: number, to: number) => *,
    selectTranslationToDelete: (translation: Translation) => *,
    deleteTranslationFromList: (id: number) => *,
    translationClearState: () => *,
    translationClearDeleteState: () => *,
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

    deleteTranslationFromList = () => {
        const { translationToDelete } = this.props;
        const { to } = this.state;
        this.props.translationClearDeleteState();

        if (translationToDelete) {
            this.props.deleteTranslationFromList(translationToDelete.id).then(() => {
                this.props.getTranslations(0, to);
            });
        }
    };

    searchHandler = () => {
        const { searchField } = this.props;

        if (searchField.value.length) {
            this.props.translationGet(searchField.value);
        }
    };

    translationSave = (data: TranslationSaveRequest) => {
        const { to } = this.state;
        let saveMethod = this.props.translationSave;
        if (data.id) {
            saveMethod = this.props.translationUpdate;
        }

        saveMethod(data).then(() => {
            this.props.getTranslations(0, to);
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
            translationToDelete,
            deleteLoading,
            deleteError,
        } = this.props;
        let { translation } = this.props;
        const { selectedTranslation } = this.state;
        const translationManipulateLoading = translationSaveLoading
            || translationUpdateLoading
            || getListLoading
            || deleteLoading;
        const translationManipulateError = getError
            || translationSaveError
            || translationUpdateError
            || getListError
            || deleteError;
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
                    onDelete={this.props.selectTranslationToDelete}
                />
                { translationManipulateLoading && <OverlayLoading /> }
                { translationManipulateError && (
                    <OverlayError
                        message={translationManipulateError.message}
                        onClick={this.props.translationHideErrors}
                    />
                ) }
                { translationToDelete && (
                    <OverlayConfirm
                        message={`Do you rally want to delete "${translationToDelete.word}" word?`}
                        acceptText="Yes"
                        cancelText="Cancel"
                        onAcceptClick={this.deleteTranslationFromList}
                        onCancelClick={this.props.translationClearDeleteState}
                    />
                ) }
            </div>
        );
    }
}
