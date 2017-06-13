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

ssrSession();

const Main = require('./main').default;

export default (userAgent, serverSideScreenClass) => {
  let output = renderStatic(() =>
    renderToString(
      <Main
        userAgent={userAgent}
        serverSideScreenClass={serverSideScreenClass}
      />
    )
  );

  return output;
};
