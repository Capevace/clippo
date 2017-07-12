const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Test</title>
      </head>
      <body>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();
          socket.on('connect', () => console.log('Connected'));
        </script>
      </body>
    </html>
  `);
});

io.on('connection', socket => {
  console.log('Connected');

  socket.on('message', payload => console.log(payload));
  socket.on('test', payload => console.log(payload));
});

http.listen(5000, () => console.log('Listening on :5000'));
