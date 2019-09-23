// @flow

import { connect } from 'react-redux';
import { translationActions } from '../../actions';
import type { StoreState } from '../../store/type';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    translation: state.translation.translation,
});

const mapDispatchToProps = ({
    clear: translationActions.clearState,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
