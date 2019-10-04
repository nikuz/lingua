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
    totalAmountLoading: state.translation.totalAmountLoading,
    totalAmount: state.translation.totalAmount,
    totalAmountError: state.translation.totalAmountError,
});

const mapDispatchToProps = ({
    translationGet: translationActions.get,
    translationSave: translationActions.save,
    translationUpdate: translationActions.update,
    removePronunciation: translationActions.removePronunciation,
    translationHideErrors: translationActions.translationHideErrors,
    clearSearchFiled: formActions.fieldValueChange,
    getTranslations: translationActions.getTranslations,
    selectTranslationToDelete: translationActions.setDeleteState,
    deleteTranslationFromList: translationActions.deleteTranslation,
    translationClearState: translationActions.clearState,
    translationClearDeleteState: translationActions.clearDeleteState,
    search: translationActions.search,
    getTotalAmount: translationActions.getTotalAmount,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
