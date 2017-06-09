// Polyfill Promises
import 'es6-promise/auto';
import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();
// import './style.css';

import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500, cyan700 } from 'material-ui/styles/colors';
import { setupSession } from './session';

import App from './components/app';

setupSession(store.dispatch);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700
  },
  appBar: {
    height: 50
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      {/* <Router> */}
      <App />
      {/* </Router> */}
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
);
