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
    translationGetLoading: state.translation.getLoading,
    searchField: formSelectors.getFieldString(state, 'search'),
    translationSaveLoading: state.translation.saveLoading,
    translationSaveError: state.translation.saveError,
    translationUpdateLoading: state.translation.updateLoading,
    translationUpdateError: state.translation.updateError,
});

const mapDispatchToProps = ({
    translationGet: translationActions.get,
    translationSave: translationActions.save,
    translationUpdate: translationActions.update,
    removePronunciation: translationActions.removePronunciation,
    translationHideErrors: translationActions.translationHideErrors,
    clearSearchFiled: formActions.fieldValueChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
