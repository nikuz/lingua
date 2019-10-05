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
import type { TextFieldData } from '../../components';
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
    searchLoading: boolean,
    searchList: TranslationsList,
    searchError: ?ErrorObject,
    totalAmountLoading: boolean,
    totalAmount: number,
    totalAmountError: ?ErrorObject,
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
    search: (value: string, signal: ?AbortSignal) => *,
    getTotalAmount: () => *,
    clearSearchState: () => *,
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

    searchHTTPRequestController: ?AbortController;

    searchHTTPRequest: ?Promise<*>;

    componentDidMount() {
        const { from, to } = this.state;
        this.props.getTranslations(from, to);
        this.props.getTotalAmount();

        if (window.AbortController) {
            this.searchHTTPRequestController = new AbortController();
        }
    }

    componentWillUnmount() {
        this.searchHTTPRequestController = null;
    }

    pagerRequest = () => {
        const {
            totalAmount,
            translationsList,
        } = this.props;

        if (translationsList.translations.length < totalAmount) {
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
            });
        }
    };

    selectTranslationFromList = (translation: Translation) => {
        this.setState({
            selectedTranslation: translation,
        });
    };

    deleteTranslationFromList = () => {
        const { translationToDelete } = this.props;
        const { to } = this.state;

        if (translationToDelete) {
            this.props.deleteTranslationFromList(translationToDelete.id).then(() => {
                this.props.getTranslations(0, to);
                this.props.getTotalAmount();
            });
        }
    };

    searchChange = (data: TextFieldData) => {
        const value = data.value.toString().trim();
        if (value !== '' && value.length > 1) {
            if (this.searchHTTPRequest && this.searchHTTPRequestController) {
                this.searchHTTPRequestController.abort();
                this.searchHTTPRequestController = new AbortController();
                this.searchHTTPRequest = null;
            }

            this.searchHTTPRequest = this.props.search(
                value,
                this.searchHTTPRequestController ? this.searchHTTPRequestController.signal : null
            );
            this.searchHTTPRequest.then(() => {
                this.searchHTTPRequest = null;
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
        let isUpdate = false;
        if (data.id) {
            saveMethod = this.props.translationUpdate;
            isUpdate = true;
        }

        saveMethod(data).then(() => {
            this.props.getTranslations(0, to);
            this.props.getTotalAmount();
            this.translationClose();
            if (!isUpdate) {
                this.props.clearSearchState();
            }
        });
    };

    translationClose = () => {
        const {
            translation,
            searchField,
            searchList,
        } = this.props;

        if (translation && !translation.id) {
            this.props.removePronunciation(translation.word);
        }

        if (!searchList.translations.length) {
            this.props.clearSearchFiled(searchField.id, '');
        }
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
            searchLoading,
            searchList,
            searchError,
            totalAmountLoading,
            totalAmount,
            totalAmountError,
        } = this.props;
        let { translation } = this.props;
        const { selectedTranslation } = this.state;
        const translationManipulateLoading = translationSaveLoading
            || translationUpdateLoading
            || deleteLoading
            || totalAmountLoading;
        const translationManipulateError = getError
            || translationSaveError
            || translationUpdateError
            || getListError
            || deleteError
            || searchError
            || totalAmountError;
        const isSearchDisabled = !searchField.value.length || translationGetLoading;
        let translationsListData = translationsList.translations;
        let total = totalAmount;

        if (!translation && selectedTranslation) {
            translation = selectedTranslation;
        }

        if (searchField.value.length > 1) {
            translationsListData = searchList.translations;
            total = searchList.translations.length;
        }

        return (
            <div className="home-container">
                <Search
                    id={searchField.id}
                    value={searchField.value}
                    loading={translationGetLoading || searchLoading}
                    disabled={isSearchDisabled}
                    onChange={this.searchChange}
                    onSubmit={this.searchHandler}
                    onClick={this.searchHandler}
                />
                <TranslationView
                    translation={translation}
                    onClose={this.translationClose}
                    onWordSelect={this.translationSave}
                />
                <TranslationsList
                    data={translationsListData}
                    total={total}
                    loading={getListLoading}
                    onScroll={this.pagerRequest}
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
