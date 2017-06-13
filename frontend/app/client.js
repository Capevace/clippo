import './helpers/setup';
import { h, render } from 'preact';
import store from './redux/store';
import { setupSession } from './session';

import App from './shared/App';

setupSession(store.dispatch);
render(
  <App />,
  document.querySelector('#app'),
  document.querySelector('#app-wrapper')
);
