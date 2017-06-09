import { createStore, combineReducers } from 'redux';

import connectionReducer from './connection/reducer';
import exchangeReducer from './exchange/reducer';
import messagesReducer from './messages/reducer';

const store = createStore(
  combineReducers({
    connection: connectionReducer,
    exchange: exchangeReducer,
    messages: messagesReducer
  })
);

export default store;
