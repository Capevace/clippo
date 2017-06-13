import { h, Component } from 'preact';
// import { Route, Link } from 'react-router-dom';
// import Loadable from 'react-loadable';

import { css } from 'glamor';

import AppBar from 'material-ui/AppBar';
import Main from '../containers/Main';

import { Provider } from 'preact-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import ContextProvider from './context-provider';

import store from '../redux/store';

const containerStyle = css({
  width: '900px',
  margin: '0 auto'
});

const Container = ({ children }) => (
  <main {...containerStyle}>
    {children}
  </main>
);

const headerStyle = css({
  position: 'relative',
  height: '62px',
  paddingTop: '20px',
  marginBottom: '20px'
});
const headerTitle = css({
  fontSize: '30px',
  display: 'inline-block',
  margin: 0,
  lineHeight: '50px'
});
const headerSubtitle = css({
  fontSize: '20px',
  fontWeight: '300'
});
const headerSeparator = css({
  width: '100%',
  height: '3px',
  background: '#efefef'
});

const headerMenuNav = css({
  padding: 0,
  float: 'right',
  lineHeight: '50px',
  margin: 0
});
const headerMenuList = css({
  listStyle: 'none',
  padding: 0,
  float: 'right',
  lineHeight: '50px',
  margin: 0,
  marginTop: '6px'
});
const headerMenuListItem = css({
  display: 'inline-block',
  marginLeft: '30px'
});
const headerMenuLink = css({
  display: 'inline-block',
  color: '#767676',
  textDecoration: 'none',
  fontWeight: '300'
});

const headerMenuLinkActive = css({
  color: '#000',
  fontWeight: 'normal'
});

const Header = () => (
  <header {...headerStyle}>
    <h1 {...headerTitle}>
      Clippo <span {...headerSubtitle}>- Securely share your Clipboard</span>
    </h1>
    <nav {...headerMenuNav}>
      <ul {...headerMenuList}>
        <li {...headerMenuListItem}>
          <a {...headerMenuLink} {...headerMenuLinkActive} href="#">Home</a>
        </li>
        <li {...headerMenuListItem}>
          <a {...headerMenuLink} href="#">About</a>
        </li>
      </ul>
    </nav>
    <div {...headerSeparator} />
  </header>
);

const App = ({ serverSideScreenClass, userAgent }) => (
  <ContextProvider
    context={{
      serverSideScreenClass
    }}
  >
    <Provider store={store}>
      <MuiThemeProvider
        muiTheme={getMuiTheme({
          palette: {
            primary1Color: blue500,
            primary2Color: blue700
          },
          userAgent
        })}
      >
        <div id="app-wrapper">
          <style>
            {`body {
                  margin: 0;
                  padding: 0;
                  font-family: Lato;
                  -webkit-font-smoothing: antialiased;
                }
                * {
                  box-sizing: border-box;
                  font-family: Lato;
                }`}
          </style>
          <Container>
            <Header />
            <Main />
          </Container>
          {/* <Route exact path="/" component={Main} /> */}
        </div>
      </MuiThemeProvider>
    </Provider>
  </ContextProvider>
);

export default App;
