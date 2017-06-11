import { NEW_MESSAGE, REMOVE_MESSAGE } from './actions';

function messages(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        [action.key]: action.message
      };
    case REMOVE_MESSAGE:
      let copy = { ...state };
      delete copy[action.key];
      return copy;
    default:
      return state;
  }
}

export default messages;
