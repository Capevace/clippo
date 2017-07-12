global.localStorage = {
  getItem: () => {}
};

const fs = require('fs');
const path = require('path');
const config = require('./config');
const renderBundle = require('../../frontend/dist/ssr/bundle').default;

function readTemplate() {
  return fs.readFileSync(
    path.resolve(config.buildPath, 'index.template.html'),
    'utf8'
  );
}

let cachedHtmlTemplate = readTemplate();

module.exports = function render(params, ssrEnabled) {
  const appOutput = renderBundle(params);
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv) {
    htmlTemplate = readTemplate();
  }

  const template = (isDevEnv ? readTemplate() : cachedHtmlTemplate)
    .replace('{{RENDERED-APP-HTML}}', ssrEnabled ? appOutput.html : '')
    .replace('{{RENDERED-APP-CSS}}', ssrEnabled ? appOutput.css : '')
    .replace(
      "'{{RENDERED-APP-STYLE-IDS}}'",
      ssrEnabled ? JSON.stringify(appOutput.ids) : '[]'
    );

  return template;
};
