const {
  generateSocketKeys,
  normalizeShortKey,
  generateRoomName
} = require('./helpers');
const clientList = require('./client-list');

function emitSessionFailure(socket, message) {
  socket.emit('session-failed', {
    message
  });
}

function sessionRequestHandler(io, socket, socketKeys) {
  return payload => {
    // Normalize Short Key (because its user entered)
    payload.shortKey = payload.shortKey
      ? normalizeShortKey(payload.shortKey)
      : null;

    // If someone tries to connect to themselves, return false
    if (
      process.env.NODE_ENV !== 'development' &&
      (payload.key === socketKeys.long ||
        normalizeShortKey(payload.shortKey) === socketKeys.short)
    ) {
      emitSessionFailure(socket, 'You cannot connect to yourself.');
      return;
    }

    // Get the requested client either by short key (if in payload) or by longKey
    const clientRequested = payload.shortKey
      ? clientList.getClientByShortKey(payload.shortKey)
      : clientList.getClient(payload.key);

    // If a client was found, process it, if not emit an error
    if (clientRequested) {
      // The client may be in a room already
      if (clientRequested.room) {
        emitSessionFailure(
          socket,
          'The requested client is already in a session.'
        );
      } else {
        // Generate a unique roomname based on the two keys
        const roomName = generateRoomName(
          socketKeys.long,
          clientRequested.keys.long
        );

        // Set the room of the currentSocket and the requested one
        clientList.setRoomForClient(roomName, socketKeys.long);
        clientList.setRoomForClient(roomName, clientRequested.keys.long);

        // Join them both into room
        socket.join(roomName, () => {
          clientRequested.socket.join(roomName, () => {
            io.to(roomName).emit('session-successful');
          });
        });
      }
    } else {
      emitSessionFailure(socket, 'No client exists with the requested key.');
    }
  };
}

module.exports = function socketHandler(io) {
  return async socket => {
    // Generate new key
    const socketKeys = await generateSocketKeys();

    // Add Client
    clientList.addClient(socket, socketKeys);

    // Emit Auth key
    socket.emit('auth-key', {
      key: socketKeys.long,
      shortKey: socketKeys.short
    });

    socket.on('session-request', sessionRequestHandler(io, socket, socketKeys));

    const handleClipboardData = dataListenerEventName => {
      function handler(data) {
        console.log('Actual data', data);
        socket.removeListener(dataListenerEventName, handler);
      }

      return handler;
    };
    socket.on('post-clipboard', payload => {
      const client = clientList.getClient(socketKeys.long);
      if (!client.room) {
        return;
      }

      const dataListenerEventName = `post-clipboard-data-${payload.clientId}-${payload.clipboard.id}`;
      socket.on(
        dataListenerEventName,
        handleClipboardData(dataListenerEventName)
      );

      io.to(client.room).emit('receive-clipboard', payload);
    });

    socket.on('disconnect', () => {
      // Get current up-to-date client
      const client = clientList.getClient(socketKeys.long);
      if (client && client.room) {
        clientList.destroyRoom(client.room);
        clientList.removeClient(socketKeys.long);
      }
    });
  };
};
