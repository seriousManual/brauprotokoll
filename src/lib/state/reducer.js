import { combineReducers } from 'redux';

import swReducer from './stopwatch/data';
import pitReducer from './pit/data'

export default combineReducers({
  sw: swReducer,
  pits: pitReducer
});