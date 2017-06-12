const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketHandler = require('./socket');

console.log('Running in env:', process.env.NODE_ENV);

global.localStorage = {
  getItem: () => {}
};

function render() {
  return require('../../frontend/dist/ssr/bundle').default();
}

app.get('/s', (req, res) =>
  res.send(
    `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <div id="app">${render()}</div>
      <div id="app2"></div>
      <script type="text/javascript" src="bundle.js"></script>
    </body>
  </html>
`
  ));

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  frontendBuildPath: path.resolve(__dirname, '../../frontend/dist/production'),
  dev_frontendBuildPath: path.resolve(__dirname, '../../frontend/dist/dev')
};

app.use(
  express.static(
    config.env === 'production'
      ? config.frontendBuildPath
      : config.dev_frontendBuildPath
  )
);

io.on('connection', socketHandler(io));

http.listen(config.port, () => console.log('Listening on *:' + config.port));
