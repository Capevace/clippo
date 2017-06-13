import { RECEIVED_CLIPBOARD, CLEAR_CLIPBOARDS } from './actions';
import { SESSION_STATUS_CHANGED } from '../connection/actions';

const initialState = {
  clipboards: []
};

function exchange(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_CLIPBOARD:
      let clipboards = state.clipboards.slice();
      clipboards.unshift({
        ...action.clipboard,
        id: String(Math.floor(Math.random() * 99999))
      });

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
    default:
      return state;
  }
}

export default exchange;
