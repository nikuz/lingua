// @flow

import * as React from 'react';
import {
    TranslationView,
    OverlayLoading,
    OverlayError,
    OverlayConfirm,
    Search,
    TranslationsList,
    FloatButton,
} from '../../components';
import { translationSelectors } from '../../selectors';
import { TRANSLATIONS_LIST_PAGE_SIZE } from '../../constants/translations';
import type {
    ErrorObject,
    FormFieldString,
    TranslationResponse,
    TranslationSaveRequest,
    Translation,
    TranslationsListType,
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
    translationsList: TranslationsListType,
    getListError: ?ErrorObject,
    translationToDelete: ?Translation,
    deleteLoading: boolean,
    deleteError: ?ErrorObject,
    searchLoading: boolean,
    searchList: TranslationsListType,
    searchError: ?ErrorObject,
    randomWordLoading: boolean,
    randomWord: ?string,
    randomWordError: ?ErrorObject,
    randomWordDeleteLoading: boolean,
    randomWordDeleted: boolean,
    randomWordDeleteError: ?ErrorObject,
    randomWordToDelete: ?string,
    translationGet: (word: string) => *,
    removePronunciation: (word: string) => *,
    translationSave: (data: TranslationSaveRequest) => *,
    translationUpdate: (data: TranslationSaveRequest) => Promise<*>,
    translationHideErrors: () => *,
    setSearchFieldValue: (id: string, value: string) => *,
    getTranslations: (from: number, to: number) => *,
    clearTranslationsList: () => *,
    selectTranslationToDelete: (translation: Translation) => *,
    deleteTranslationFromList: (id: number) => *,
    clearTranslationState: () => *,
    translationClearDeleteState: () => *,
    search: (value: string, from: number, to: number, signal: ?AbortSignal) => *,
    clearSearchState: () => *,
    getRandomWord: () => *,
    selectRandomWordToDelete: (word: string) => *,
    deleteRandomWord: (word: string) => *,
};

type State = {
    from: number,
    to: number,
};

export default class Home extends React.Component<Props, State> {
    state = {
        from: 0,
        to: TRANSLATIONS_LIST_PAGE_SIZE,
    };

    searchHTTPRequestController: ?AbortController;

    searchHTTPRequest: ?Promise<*>;

    componentDidMount() {
        const { from, to } = this.state;
        this.props.getTranslations(from, to);

        if (window.AbortController) {
            this.searchHTTPRequestController = new AbortController();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.randomWord && this.props.randomWord) {
            this.searchHandler(this.props.randomWord);
        }
        if (!prevProps.randomWordDeleted && this.props.randomWordDeleted) {
            this.translationClose();
        }
    }

    componentWillUnmount() {
        this.searchHTTPRequestController = null;
    }

    pagerRequest = () => {
        const {
            translationsList,
            searchList,
            searchField,
        } = this.props;

        if (
            (
                !searchField.value.length
                && translationsList.translations.length < translationsList.totalAmount
            )
            || (searchList.translations.length < searchList.totalAmount)
        ) {
            this.setState((prevState) => {
                const from = prevState.from + TRANSLATIONS_LIST_PAGE_SIZE;
                const to = prevState.to + TRANSLATIONS_LIST_PAGE_SIZE;

                if (searchField.value.length) {
                    this.props.search(
                        searchField.value,
                        from,
                        to
                    );
                } else {
                    this.props.getTranslations(
                        from,
                        to
                    );
                }

                return {
                    from,
                    to,
                };
            });
        }
    };

    deleteRandomWord = () => {
        const { randomWord } = this.props;
        if (randomWord) {
            this.props.deleteRandomWord(randomWord);
        }
    };

    selectRandomWordToDelete = () => {
        const { randomWord } = this.props;
        if (randomWord) {
            this.props.selectRandomWordToDelete(randomWord);
        }
    };

    selectTranslationFromList = (translation: Translation) => {
        this.props.translationGet(translation.word);
    };

    deleteTranslationFromList = () => {
        const {
            searchList,
            searchField,
            translationToDelete,
        } = this.props;
        const { to } = this.state;

        if (translationToDelete) {
            this.props.deleteTranslationFromList(translationToDelete.id).then(() => {
                if (searchField.value.length) {
                    if (searchList.translations.length === 1) {
                        this.props.setSearchFieldValue(this.props.searchField.id, '');
                        this.props.getTranslations(0, to);
                    } else {
                        this.searchChange({
                            id: searchField.id,
                            value: searchField.value,
                        });
                    }
                } else {
                    this.props.getTranslations(0, to);
                }
            });
        }
    };

    searchTimer: TimeoutID;

    searchChange = (data: TextFieldData) => {
        const {
            translationsList,
            searchList,
        } = this.props;
        const value = data.value.toString().trim();

        clearTimeout(this.searchTimer);

        if (value !== '' && value.length > 1) {
            if (translationsList.translations.length) {
                this.props.clearTranslationsList();
            }
            if (this.searchHTTPRequest && this.searchHTTPRequestController) {
                this.searchHTTPRequestController.abort();
                this.searchHTTPRequestController = new AbortController();
                this.searchHTTPRequest = null;
            }

            const from = 0;
            const to = TRANSLATIONS_LIST_PAGE_SIZE;

            this.searchTimer = setTimeout(() => {
                this.searchHTTPRequest = this.props.search(
                    value,
                    from,
                    to,
                    this.searchHTTPRequestController
                        ? this.searchHTTPRequestController.signal
                        : null
                );
                if (this.searchHTTPRequest instanceof Promise) {
                    this.searchHTTPRequest.then(() => {
                        this.searchHTTPRequest = null;
                        this.setState({
                            from,
                            to,
                        });
                    });
                }
            }, 100);
        } else {
            if (searchList.translations.length) {
                this.props.clearSearchState();
            }
            if (!translationsList.translations.length) {
                const from = 0;
                const to = TRANSLATIONS_LIST_PAGE_SIZE;
                this.props.getTranslations(from, to);
                this.setState({
                    from,
                    to,
                });
            }
        }
    };

    searchHandler = (word: string | MouseEvent | KeyboardEvent) => {
        let searchValue = this.props.searchField.value;

        if (typeof word === 'string') {
            searchValue = word;
        }

        if (searchValue.length) {
            this.props.translationGet(searchValue);
        }
    };

    translationSave = (data: TranslationSaveRequest) => {
        if (translationSelectors.isCyrillicWord(data.word)) {
            this.props.setSearchFieldValue(this.props.searchField.id, data.translation);
            this.searchHandler(data.translation);
        } else {
            const { searchField } = this.props;
            let saveMethod = this.props.translationSave;
            let isUpdate = false;
            if (data.id) {
                saveMethod = this.props.translationUpdate;
                isUpdate = true;
            }

            saveMethod(data).then(() => {
                this.props.getTranslations(0, this.state.to);
                this.props.setSearchFieldValue(searchField.id, '');
                this.translationClose();
                if (!isUpdate) {
                    this.props.clearSearchState();
                }
            });
        }
    };

    translationClose = () => {
        const {
            translation,
            searchField,
            searchList,
        } = this.props;
        const { from, to } = this.state;

        if (translation && !translation.id) {
            this.props.removePronunciation(translation.word);
        }

        if (!searchList.translations.length) {
            this.props.setSearchFieldValue(searchField.id, '');
            this.props.getTranslations(from, to);
        }
        this.props.clearTranslationState();
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
            translationToDelete,
            deleteLoading,
            deleteError,
            searchLoading,
            searchList,
            searchError,
            randomWordLoading,
            randomWord,
            randomWordError,
            randomWordDeleteLoading,
            randomWordDeleteError,
            randomWordToDelete,
        } = this.props;
        const translationManipulateLoading = translationSaveLoading
            || translationUpdateLoading
            || deleteLoading
            || randomWordDeleteLoading;
        const translationManipulateError = getError
            || translationSaveError
            || translationUpdateError
            || getListError
            || deleteError
            || searchError
            || randomWordError
            || randomWordDeleteError;
        const isSearchDisabled = !searchField.value.length || translationGetLoading;
        let translationsListData = translationsList.translations;
        let total = translationsList.totalAmount;

        if (searchField.value.length > 1) {
            translationsListData = searchList.translations;
            total = searchList.totalAmount;
        }

        return (
            <div className="home-container">
                <Search
                    id={searchField.id}
                    value={searchField.value}
                    loading={translationGetLoading || searchLoading || randomWordLoading}
                    disabled={isSearchDisabled}
                    onChange={this.searchChange}
                    onSubmit={this.searchHandler}
                    onClick={this.searchHandler}
                />
                <TranslationView
                    translation={translation}
                    randomWord={randomWord}
                    deleteRandomWord={this.selectRandomWordToDelete}
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
                { randomWordToDelete && (
                    <OverlayConfirm
                        message={`Add "${randomWordToDelete}" random word into block list?`}
                        acceptText="Yes"
                        cancelText="Cancel"
                        onAcceptClick={this.deleteRandomWord}
                        onCancelClick={this.props.translationClearDeleteState}
                    />
                ) }
                { !translation && (
                    <FloatButton
                        icon="plus"
                        color="blue"
                        loading={randomWordLoading || (!!randomWord && translationGetLoading)}
                        onClick={this.props.getRandomWord}
                    />
                ) }
            </div>
        );
    }
}
