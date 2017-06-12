global.window = {};
global.document = {};
global.localStorage = {
  getItem: () => {}
};

import { h } from 'preact';
import renderToString from 'preact-render-to-string';
import { ssrSession } from './session';

ssrSession();

const Main = require('./main').default;

export default (userAgent, serverSideScreenClass) => {
  return renderToString(
    <Main userAgent={userAgent} serverSideScreenClass={serverSideScreenClass} />
  );
};
