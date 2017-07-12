import {
  RECEIVED_CLIPBOARD,
  CLEAR_CLIPBOARDS,
  ADDED_CLIPBOARD_TO_QUEUE,
  REMOVED_CLIPBOARD_TO_QUEUE
} from './actions';
import { SESSION_STATUS_CHANGED } from '../connection/actions';

const initialState = {
  clipboards: [],
  pasteQueue: []
};

function exchange(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_CLIPBOARD:
      let clipboards = state.clipboards.slice();
      clipboards.unshift(action.data);

      return {
        ...state,
        clipboards
      };
    case CLEAR_CLIPBOARDS:
    case SESSION_STATUS_CHANGED:
      return {
        ...state,
        clipboards: []
      };
    case ADDED_CLIPBOARD_TO_QUEUE:
      console.log('Added Clipboard');
      return {
        ...state,
        pasteQueue: [
          ...state.pasteQueue,
          {
            id: action.id
          }
        ]
      };
    case REMOVED_CLIPBOARD_TO_QUEUE:
      console.log('Removed Clipboard');
      let queue = state.pasteQueue.slice();
      return {
        ...state,
        pasteQueue: queue.filter(obj => obj.id !== action.idToDelete)
      };
    default:
      return state;
  }
}

export default exchange;
