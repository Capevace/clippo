const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketHandler = require('./socket');

console.log('Running in env:', process.env.NODE_ENV);

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
