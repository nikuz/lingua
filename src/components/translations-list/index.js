// @flow

import { connect } from 'react-redux';
import { routerSelectors } from '../../selectors';
import type { StoreState } from '../../store/type';
import View from './TranslationsList';

const mapStateToProps = (state: StoreState) => ({
    apiUrl: routerSelectors.getApiUrl(state),
});

export default connect(mapStateToProps)(View);
