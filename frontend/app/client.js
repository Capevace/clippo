if (module.hot) {
  require('preact/devtools');
}

// Polyfill Promises
import 'es6-promise/auto';
import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();
// import './style.css';

import { render, h } from 'preact';
import store from './redux/store';
import { setupSession } from './session';

setupSession(store.dispatch);

import Main from './main';

render(
  <Main />,
  document.querySelector('#app'),
  document.querySelector('#app2')
);
