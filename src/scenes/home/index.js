// @flow

import { connect } from 'react-redux';
import { translationActions } from '../../actions';
import { formSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    translationGetLoading: state.translation.getLoading,
    translation: state.translation.translation,
    translationGetError: state.translation.getError,
    searchField: formSelectors.getFieldString(state, 'search'),
});

const mapDispatchToProps = ({
    translationGet: translationActions.get,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
