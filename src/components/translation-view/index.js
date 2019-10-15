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
    imagePickerOpened: state.translation.imagePickerOpened,
    images: state.translation.images,
    imageError: state.translation.imageError,
    randomWordDeleteLoading: state.translation.randomWordDeleteLoading,
});

const mapDispatchToProps = ({
    getImage: translationActions.getImage,
    toggleImagePickerVisibility: translationActions.toggleImagePickerVisibility,
    selectImage: translationActions.selectImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
