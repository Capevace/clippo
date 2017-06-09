import {
  CONNECTION_STATUS_CHANGED,
  CONNECTION_KEY_RECEIVED,
  SESSION_STATUS_CHANGED
} from './actions';
import hash from '../../helpers/hash';

const initialState = {
  status: 'DISCONNECTED',
  key: null,
  shortKey: null,
  id: null,
  inSession: false
};

function connection(state = initialState, action) {
  switch (action.type) {
    case CONNECTION_STATUS_CHANGED:
      return {
        ...state,
        status: action.status,
        inSession: action.status !== 'CONNECTED' ? false : state.inSession
      };
    case CONNECTION_KEY_RECEIVED:
      return {
        ...state,
        key: action.key,
        shortKey: action.shortKey,
        id: hash(action.key.toLowerCase())
      };
    case SESSION_STATUS_CHANGED:
      return {
        ...state,
        inSession: action.inSession
      };
    default:
      return state;
  }
}

export default connection;
