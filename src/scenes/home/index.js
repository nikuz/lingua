// @flow

import { connect } from 'react-redux';
import {
    formActions,
    translationActions,
} from '../../actions';
import { formSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './Home';

const mapStateToProps = (state: StoreState) => ({
    translation: state.translation.translation,
    getError: state.translation.getError,
    translationGetLoading: state.translation.getLoading,
    searchField: formSelectors.getFieldString(state, 'search'),
    translationSaveLoading: state.translation.saveLoading,
    translationSaveError: state.translation.saveError,
    translationUpdateLoading: state.translation.updateLoading,
    translationUpdateError: state.translation.updateError,
    getListLoading: state.translation.getListLoading,
    translationsList: state.translation.translationsList,
    getListError: state.translation.getListError,
    translationToDelete: state.translation.translationToDelete,
    deleteLoading: state.translation.deleteLoading,
    deleteError: state.translation.deleteError,
    searchLoading: state.translation.searchLoading,
    searchList: state.translation.searchList,
    searchError: state.translation.searchError,
    randomWordLoading: state.translation.randomWordLoading,
    randomWord: state.translation.randomWord,
    randomWordError: state.translation.randomWordError,
    randomWordDeleteLoading: state.translation.randomWordDeleteLoading,
    randomWordDeleted: state.translation.randomWordDeleted,
    randomWordDeleteError: state.translation.randomWordDeleteError,
    randomWordToDelete: state.translation.randomWordToDelete,
});

const mapDispatchToProps = ({
    translationGet: translationActions.get,
    translationSave: translationActions.save,
    translationUpdate: translationActions.update,
    removePronunciation: translationActions.removePronunciation,
    translationHideErrors: translationActions.hideErrors,
    setSearchFieldValue: formActions.fieldValueChange,
    getTranslations: translationActions.getTranslations,
    clearTranslationsList: translationActions.clearList,
    selectTranslationToDelete: translationActions.setDeleteState,
    deleteTranslationFromList: translationActions.deleteTranslation,
    clearTranslationState: translationActions.clearState,
    translationClearDeleteState: translationActions.clearDeleteState,
    search: translationActions.search,
    clearSearchState: translationActions.clearSearchState,
    getRandomWord: translationActions.getRandomWord,
    selectRandomWordToDelete: translationActions.setRandomWordDeleteState,
    deleteRandomWord: translationActions.deleteRandomWord,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
