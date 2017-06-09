const promisify = require('util').promisify;
const crypto = require('crypto');
const sh = require('./shorthash').unique;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log(process.env.NODE_ENV);

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV
};

const clients = {};

if (config.env !== 'production')
  app.use(express.static(__dirname + '/../../frontend/dist'));
else
  app.use(express.static(__dirname + '/../public'));

io.on('connection', async socket => {
  // Generate new key
  const socketKey = await generateKey();
  const shortSocketKey = shorthash(socketKey).toLowerCase();
  // Set key to be used
  clients[socketKey] = {
    socket,
    socketKey,
    shortSocketKey
  };

  socket.on('disconnect', () => {
    const client = clients[socketKey];
    if (client) {
      if (client.room) {
        // TODO PLS DO SHIT HERE K THX
        Object.keys(clients).forEach(clientKey => {
          const c = clients[clientKey];
          if (
            (client.room || '').toLowerCase() === (c.room || '').toLowerCase()
          ) {
            c.socket.emit('session-destroyed');
            c.socket.leave(c.room);
            clients[clientKey].room = null;
          }
        });
      }

      delete clients[socketKey];
    }
  });

  // Emit Auth key
  socket.emit('auth-key', {
    key: socketKey,
    shortKey: shortSocketKey
  });

  socket.on('session-request', ({
    key: scannedKey,
    shortKey
  }) => {
    if (scannedKey === socketKey) return;
    let otherClient;
    if (shortKey) {
      otherClient = Object.keys(clients).reduce(
        (c, clientKey) => {
          if (c) return c;
          const currentClient = clients[clientKey];
          if (
            currentClient.shortSocketKey.toLowerCase() ===
            shortKey.toLowerCase()
          )
            return currentClient;
          return null;
        },
        null
      );
    } else {
      otherClient = clients[scannedKey];
    }

    if (otherClient) {
      if (otherClient.room) {
        socket.emit('session-failed', {
          message: 'The requested client is already in a session.'
        });
      } else {
        const roomName = generateRoomName(socketKey, otherClient.socketKey);
        socket.join(roomName, () => {
          otherClient.socket.join(roomName, () => {
            clients[socketKey].room = roomName;
            clients[otherClient.socketKey].room = roomName;
            io.to(roomName).emit('session-successful');
          });
        });
      }
    } else {
      socket.emit('session-failed', {
        message: 'No client with that key.'
      });
    }
  });

  socket.on('post-clipboard', payload => {
    if (!clients[socketKey].room) return;

    io.to(clients[socketKey].room).emit('receive-clipboard', payload);
  });
});

http.listen(config.port, function() {
  console.log('Listening on *:' + config.port);
});

function roomnameFromKey(key) {
  return 'room-' + key;
}

async function generateKey() {
  let key = null;
  do {
    try {
      const buffer = await promisify(crypto.randomBytes)(32);
      key = buffer.toString('hex');

      if (clients[key]) key = null;
    } catch (e) {
      throw e;
    }
  } while (!key);

  return key;
}

function generateRoomName(key1, key2) {
  let combined = key2 + '-' + key1;
  if (key1 <= key2) {
    combined = key1 + '-' + key2;
  }

  return crypto.createHash('md5').update(combined).digest('hex');
}

function shorthash(str) {
  return (sh(str) + 's6F4').substr(0, 6);
}
