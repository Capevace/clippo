const argv = require('yargs')
  .alias('d', 'dev')
  .alias('S', 'enable-ssr')
  .help('help').argv;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = argv.dev ? 'development' : 'production';
}

console.log('Running in env:', process.env.NODE_ENV);
console.log('SSR is:', argv['enable-ssr'] ? 'enabled' : 'disabled');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const MobileDetect = require('mobile-detect');
const socketHandler = require('./socket');
const config = require('./config');
const render = require('./template');

app.use(express.static(config.buildPath));
app.get('/*', (req, res) => {
  const userAgent = req.headers['user-agent'];

  const md = new MobileDetect(userAgent);
  let serverSideScreenClass = 'xl';
  if (md.phone() !== null) serverSideScreenClass = 'xs';
  if (md.tablet() !== null) serverSideScreenClass = 'md';

  const renderedOutput = render(
    {
      userAgent,
      serverSideScreenClass,
      location: req.url
    },
    argv['enable-ssr']
  );
  res.send(renderedOutput);
});

io.on('connection', socketHandler(io));

http.listen(config.port, () => console.log('Listening on *:' + config.port));
