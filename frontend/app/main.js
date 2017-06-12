import { h } from 'preact';
import { Provider } from 'preact-redux';
import store from './redux/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import ContextProvider from './components/context-provider';
import App from './components/app';

export default ({ userAgent, serverSideScreenClass }) => {
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: blue500,
      primary2Color: blue700
    },
    userAgent
  });

  return (
    <ContextProvider
      context={{
        serverSideScreenClass
      }}
    >
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    </ContextProvider>
  );
};
