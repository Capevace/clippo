import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { join } from 'path';

import Snackbar from 'material-ui/Snackbar';
import AuthContainer from '../scenes/authentication/AuthPage';
import Loader from './Loader';

import Loadable from 'react-loadable';

const LoadShare = Loadable({
  loader: () => import('../scenes/sharing/SharePage'),
  LoadingComponent: ({ isLoading, pastDelay, error }) =>
    pastDelay ? (isLoading ? 'Loading...' : null) : error || null,
  delay: 200,
  serverSideRequirePath: require('path').join(
    __dirname,
    '../scenes/sharing/SharePage'
  ),
  webpackRequireWeakId: () => require.resolveWeak('../scenes/sharing/SharePage')
});

const Main = props => (
  <section>
    {!props.inSession ? <AuthContainer /> : <LoadShare />}
  </section>
);

const mapStateToProps = state => ({
  inSession: state.connection.inSession
});

export default connect(mapStateToProps)(Main);
