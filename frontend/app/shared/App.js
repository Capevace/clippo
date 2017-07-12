import { h, Component } from 'preact';
// import { Route, Link } from 'react-router-dom';
import { Route, NavLink } from 'react-router-dom';

let Router;
if (process.env.NODE_ENV === 'ssr') {
  Router = require('react-router-dom').StaticRouter;
} else {
  Router = require('react-router-dom').BrowserRouter;
}

// import Loadable from 'react-loadable';
import { css } from 'glamor';

import AppBar from 'material-ui/AppBar';
import Main from './Main';
import MessagesContainer from './MessagesContainer';

import { Provider } from 'preact-redux';
import Loadable from 'react-loadable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import ContextProvider from './ContextProvider';
import Loader from './Loader';

import store from '../redux/store';

const containerStyle = css({
  width: '900px',
  margin: '0 auto',
  '@media (max-width: 950px)': {
    width: '90%'
  }
});

const Container = ({ children }) => (
  <main {...containerStyle}>
    {children}
  </main>
);

const headerStyle = css({
  position: 'relative',
  height: '65px',
  padding: '5px 30px',
  marginBottom: '20px',
  background: 'black',
  color: 'white',
  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.5)'
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
  lineHeight: '55px',
  margin: 0
});
const headerMenuListItem = css({
  display: 'inline-block',
  marginLeft: '30px'
});
const headerMenuLink = css({
  display: 'inline-block',
  color: '#767676',
  textDecoration: 'none',
  fontWeight: '300',
  ':hover': {
    color: '#fff'
  }
});

const headerMenuLinkActive = css({
  color: '#fff',
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
          <NavLink
            to="/"
            exact
            className={headerMenuLink}
            activeClassName={headerMenuLinkActive}
          >
            Home {console.log(headerMenuLink, headerMenuLink.toString())}
          </NavLink>
        </li>
        <li {...headerMenuListItem}>
          <NavLink
            to="/about"
            exact
            className={headerMenuLink}
            activeClassName={headerMenuLinkActive}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

const AboutPage = Loadable({
  loader: () => import('../scenes/about/AboutPage'),
  LoadingComponent: ({ isLoading, pastDelay, error }) =>
    pastDelay
      ? isLoading ? <Loader loading style="margin: 100px auto" /> : null
      : error || null,
  serverSideRequirePath: require('path').join(
    __dirname,
    '../scenes/about/AboutPage'
  ),
  webpackRequireWeakId: () => require.resolveWeak('../scenes/about/AboutPage')
});

const App = ({ serverSideScreenClass, userAgent, location }) =>
  (console.log('Location', location), (
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
          <Router location={location}>
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

              <Header />
              <Container>
                <Route exact path="/" component={Main} />
                <Route exact path="/about" component={AboutPage} />

                <MessagesContainer />
              </Container>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    </ContextProvider>
  ));

export default App;
