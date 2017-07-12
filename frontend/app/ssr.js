global.window = {};
global.document = {
  createElement: () => ({})
};
global.localStorage = {
  getItem: () => {}
};

import { h } from 'preact';
import renderToString from 'preact-render-to-string';
import { renderStatic } from 'glamor/server';
import { ssrSession } from './session';
import App from './shared/App';

ssrSession();

export default params => {
  let output = renderStatic(() =>
    renderToString(
      <App
        userAgent={params.userAgent}
        serverSideScreenClass={params.serverSideScreenClass}
        location={params.location}
      />
    )
  );

  return output;
};
