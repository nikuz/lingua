// @flow

import { connect } from 'react-redux';
import { translationActions } from '../../actions';
import { routerSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    apiUrl: routerSelectors.getApiUrl(state),
    translation: state.translation.translation,
    error: state.translation.getError,
    imageLoading: state.translation.imageLoading,
    image: state.translation.image,
    imageError: state.translation.imageError,
});

const mapDispatchToProps = ({
    getImage: translationActions.getImage,
    clear: translationActions.clearState,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
