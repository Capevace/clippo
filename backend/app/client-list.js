const connectedClients = {};

const clientList = {
  addClient(socket, keys) {
    connectedClients[keys.long] = {
      socket,
      keys,
      room: null
    };
  },

  removeClient(longKey) {
    if (connectedClients[longKey]) delete connectedClients[longKey];
  },

  getClient(longKey) {
    return connectedClients[longKey];
  },

  getClientByShortKey(shortKey) {
    let foundClient;
    for (const clientLongKey in connectedClients) {
      const client = clientList.getClient(clientLongKey);

      if (shortKey === client.keys.short) {
        foundClient = client;
      }
    }

    return foundClient;
  },

  setRoomForClient(roomName, longKey) {
    connectedClients[longKey] = Object.assign({}, connectedClients[longKey], {
      room: roomName
    });
  },

  destroyRoom(roomName) {
    for (const clientLongKey in connectedClients) {
      const client = clientList.getClient(clientLongKey);

      if (client.room === roomName) {
        client.socket.emit('session-destroyed');
        client.socket.leave(roomName);
        clientList.setRoomForClient(null, client.keys.long);
      }
    }
  },

  getExistingLongKeys() {
    return Object.keys(connectedClients);
  }
};

module.exports = clientList;
