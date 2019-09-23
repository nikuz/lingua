// @flow

import { connect } from 'react-redux';
import { translationActions } from '../../actions';
import { routerSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    apiUrl: routerSelectors.getApiUrl(state),
    translation: state.translation.translation,
});

const mapDispatchToProps = ({
    clear: translationActions.clearState,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
