// @flow

import { connect } from 'react-redux';
import { translationActions } from '../../actions';
import { routerSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './TranslationView';

const mapStateToProps = (state: StoreState) => ({
    apiUrl: routerSelectors.getApiUrl(state),
    imageLoading: state.translation.imageLoading,
    image: state.translation.image,
    imageError: state.translation.imageError,
});

const mapDispatchToProps = ({
    getImage: translationActions.getImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
