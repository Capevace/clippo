if (process.env.NODE_ENV === 'development') {
  require('preact/devtools');
}

import 'es6-promise/auto';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  runtime
    .register()
    .then(() => console.info('Service worker registered.'))
    .catch(e => console.error('Error registering Service Worker', e));
}

import injectTapEventPlugin from 'preact-tap-event-plugin';
injectTapEventPlugin();

// import { rehydrate } from 'glamor';
// rehydrate(window._glam);
