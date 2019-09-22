// @flow

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appActions } from '../../actions';
import type { StoreState } from '../../store/type';
import View from './view';

const mapStateToProps = (state: StoreState) => ({
    apiIPLoading: state.app.apiIPLoading,
    apiIPError: state.app.apiIPError,
});

const mapDispatchToProps = ({
    getApiIP: appActions.getApiIP,
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(View));
