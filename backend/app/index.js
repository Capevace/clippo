const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketHandler = require('./socket');
const MobileDetect = require('mobile-detect');
const config = require('./config');
const render = require('./template');

console.log('Running in env:', process.env.NODE_ENV);

app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const md = new MobileDetect(userAgent);

  let serverSideScreenClass = 'xl';
  if (md.phone() !== null) serverSideScreenClass = 'xs';
  if (md.tablet() !== null) serverSideScreenClass = 'md';

  res.send(render(userAgent, serverSideScreenClass));
});

app.get('/dev', (req, res) => {
  res.send(render(null, null, true));
});

app.use(express.static(config.buildPath));

io.on('connection', socketHandler(io));

http.listen(config.port, () => console.log('Listening on *:' + config.port));
