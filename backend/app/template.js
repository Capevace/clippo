const fs = require('fs');
const path = require('path');
const config = require('./config');

global.localStorage = {
  getItem: () => {}
};

const renderBundle = require('../../frontend/dist/ssr/bundle').default;

const htmlTemplate = fs.readFileSync(
  path.resolve(config.buildPath, 'index.template.html'),
  'utf8'
);

module.exports = function render(userAgent, serverSideScreenClass) {
  const renderedApp = renderBundle(userAgent, serverSideScreenClass);

  return htmlTemplate.replace('{{RENDERED-APP-CONTENT}}', renderedApp);
};
