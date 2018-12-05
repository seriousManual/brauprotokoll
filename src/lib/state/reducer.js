import { combineReducers } from 'redux';

import protocolReducer from './protocol/data';

export default combineReducers({
  protocol: protocolReducer
});