// @flow

import { connect } from 'react-redux';
import {
    formActions,
    translationActions,
} from '../../actions';
import { formSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './view';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
