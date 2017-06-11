import io from 'socket.io-client';
import { event } from './analytics';
import generateMessageKey from './helpers/generate-message-key';
import {
  CONNECTION_STATUS_CHANGED,
  CONNECTION_KEY_RECEIVED,
  SESSION_STATUS_CHANGED
} from './redux/connection/actions';
import { NEW_MESSAGE, REMOVE_MESSAGE } from './redux/messages/actions';
import { RECEIVED_CLIPBOARD } from './redux/exchange/actions';

const cachedKey = localStorage.getItem('auth-key');

let socket;

export function setupSession(dispatch) {
  socket = io('/', { secure: true });

  socket.on('connect', () => {
    dispatch({
      type: CONNECTION_STATUS_CHANGED,
      status: 'CONNECTED'
    });
  });

  socket.on('disconnect', () => {
    dispatch({
      type: CONNECTION_STATUS_CHANGED,
      status: 'DISCONNECTED'
    });
  });

  socket.on('auth-key', payload => {
    dispatch({
      type: CONNECTION_KEY_RECEIVED,
      key: payload.key,
      shortKey: payload.shortKey
    });
  });

  // Session handlers
  socket.on('session-successful', () => {
    event('joined_session');

    dispatch({
      type: SESSION_STATUS_CHANGED,
      inSession: true
    });

    sendMessage('You successfully connected to another client.');
  });

  socket.on('session-failed', ({ message }) => {
    dispatch({
      type: SESSION_STATUS_CHANGED,
      inSession: false
    });

    event('session_failed', message);

    sendMessage('The session failed: ' + message);
  });

  socket.on('session-destroyed', () => {
    dispatch({
      type: SESSION_STATUS_CHANGED,
      inSession: false
    });

    sendMessage('The Session was destroyed.');
  });

  socket.on('receive-clipboard', payload => {
    dispatch({
      type: RECEIVED_CLIPBOARD,
      clipboard: payload
    });
  });

  const sendMessage = message => {
    const messageKey = generateMessageKey();
    dispatch({
      type: NEW_MESSAGE,
      key: messageKey,
      message
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_MESSAGE,
          key: messageKey
        }),
      5000
    );
  };
}

export function getSocket() {
  return socket;
}

export function emitClipboard(clipboard, clientId) {
  socket.emit('post-clipboard', {
    clipboard,
    clientId
  });
}

export function requestSession(key) {
  socket.emit('session-request', {
    key
  });

  event('session_request');
}

export function requestSessionWithShortKey(shortKey) {
  socket.emit('session-request', {
    shortKey
  });

  event('session_request_with_short_key');
}

export const emit = (...args) => socket.emit(...args);
