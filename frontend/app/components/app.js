import { h, Component } from 'preact';
// import { Route, Link } from 'react-router-dom';
// import Loadable from 'react-loadable';

import AppBar from 'material-ui/AppBar';
import Main from '../containers/Main';

class App extends Component {
  render() {
    return (
      <div id="apps">
        <style>
          {`body {
            margin: 0;
            padding: 0;
            font-family: Roboto;
          }`}
        </style>
        <AppBar title="Clippo" showMenuIconButton={false} />

        {/* <Route exact path="/" component={Main} /> */}
        <Main />
      </div>
    );
  }
}

export default App;
