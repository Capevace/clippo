import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { join } from 'path';

import Snackbar from 'material-ui/Snackbar';
import AuthenticationContainer from './AuthenticationContainer';

import Loadable from 'react-loadable';

const LoadShare = Loadable({
  loader: () => import('./ShareContainer'),
  LoadingComponent: ({ isLoading, pastDelay, error }) =>
    pastDelay ? (isLoading ? 'Loading...' : null) : error || null,
  delay: 200,
  serverSideRequirePath: require('path').join(__dirname, './ShareContainer'),
  webpackRequireWeakId: () => require.resolveWeak('./ShareContainer')
});

const Main = props => (
  <main>
    {!props.inSession ? <AuthenticationContainer /> : <LoadShare />}
    {Object.keys(props.messages).map(messageKey => (
      <Snackbar open message={props.messages[messageKey]} />
    ))}
  </main>
);

const mapStateToProps = state => ({
  inSession: state.connection.inSession,
  messages: state.messages
});

export default connect(mapStateToProps)(Main);
