import { RECEIVED_CLIPBOARD, CLEAR_CLIPBOARDS } from './actions';
import { SESSION_STATUS_CHANGED } from '../connection/actions';

const initialState = {
  clipboards: []
};

function exchange(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_CLIPBOARD:
      return {
        ...state,
        clipboards: [...state.clipboards, action.clipboard]
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
