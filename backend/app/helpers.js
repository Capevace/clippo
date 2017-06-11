const crypto = require('crypto');
const sh = require('shorthash').unique;
const promisify = require('util').promisify;
const { getExistingLongKeys } = require('./client-list');

function roomnameFromKey(key) {
  return 'room-' + key;
}

async function generateRandomHash() {
  let key = null;
  do {
    try {
      const buffer = await promisify(crypto.randomBytes)(32);
      key = buffer.toString('hex');

      if (getExistingLongKeys()[key]) key = null;
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

function normalizeShortKey(key) {
  return key.toLowerCase();
}

async function generateSocketKeys() {
  const socketKey = await generateRandomHash();
  const shortSocketKey = normalizeShortKey(shorthash(socketKey));

  return { long: socketKey, short: shortSocketKey };
}

module.exports = {
  roomnameFromKey,
  generateRandomHash,
  generateRoomName,
  shorthash,
  normalizeShortKey,
  generateSocketKeys
};
