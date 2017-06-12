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

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="description" content="An easy way to share your clipboard across your devices.">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>Clippo - Share your Clipboard</title>
      </head>
      <body>
        <div id="app">${renderedApp}</div>
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>
  `;
};
