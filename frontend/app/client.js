if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}

// // check if Service Worker support exists in browser or not
// if ('serviceWorker' in navigator) {
//   //Service Worker support exists
// } else {
//   //still not supported
// }
//
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
//
// if ('serviceWorker' in navigator) {
//   runtime
//     .register()
//     .then(() => console.info('Service worker registered.'))
//     .catch(e => console.error('Error registering Service Worker', e));
// }

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
  document.querySelector('#apps')
);
