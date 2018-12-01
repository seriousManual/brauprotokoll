import { combineReducers } from 'redux';

import swReducer from './stopwatch/data';

export default combineReducers({
  sw: swReducer
});