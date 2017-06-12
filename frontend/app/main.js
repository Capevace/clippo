import { h } from 'preact';
import { Provider } from 'preact-redux';
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import App from './components/app';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700
  },
  userAgent: false
});

export default () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      {/* <Router> */}
      <App />
      {/* </Router> */}
    </MuiThemeProvider>
  </Provider>
);
