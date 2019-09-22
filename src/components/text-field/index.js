// @flow

import { connect } from 'react-redux';
import { formActions } from '../../actions';
import type { StoreState } from '../../store/type';
import View from './view';

export type * from './view';

const mapStateToProps = (state: StoreState) => ({
    form: state.form,
});

const mapDispatchToProps = {
    passwordVisibilityToggle: formActions.passwordVisibilityToggle,
    setIntoStore: formActions.fieldSetIntoStore,
    valueChange: formActions.fieldValueChange,
    clear: formActions.fieldClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
