import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Snackbar from 'material-ui/Snackbar';
import AuthenticationContainer from './AuthenticationContainer';

import Loadable from 'react-loadable';

const LoadShare = Loadable({
  loader: () => import('./ShareContainer'),
  LoadingComponent: ({ isLoading, pastDelay, error }) =>
    pastDelay ? isLoading ? 'Loading...' : null : error || null,
  delay: 200
});

const Main = props => (
  <div>
    {!props.inSession ? <AuthenticationContainer /> : <LoadShare />}
    {Object.keys(props.messages).map(messageKey => (
      <Snackbar open message={props.messages[messageKey]} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  inSession: state.connection.inSession,
  messages: state.messages
});

export default connect(mapStateToProps)(Main);
