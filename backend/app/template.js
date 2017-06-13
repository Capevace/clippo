const fs = require('fs');
const path = require('path');
const config = require('./config');

global.localStorage = {
  getItem: () => {}
};

const renderBundle = require('../../frontend/dist/ssr/bundle').default;

let htmlTemplate = fs.readFileSync(
  path.resolve(config.buildPath, 'index.template.html'),
  'utf8'
);

module.exports = function render(userAgent, serverSideScreenClass, keepEmpty) {
  const renderedApp = renderBundle(userAgent, serverSideScreenClass);

  if (process.env.NODE_ENV === 'development') {
    htmlTemplate = fs.readFileSync(
      path.resolve(config.buildPath, 'index.template.html'),
      'utf8'
    );
  }

  return htmlTemplate.replace(
    '{{RENDERED-APP-CONTENT}}',
    keepEmpty ? '' : renderedApp
  );
};
