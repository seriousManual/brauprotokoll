import { combineReducers } from 'redux';

import appReducer from './app/data'
import protocolReducer from './protocol/data';
import pitReducer from './pit/data';
import swReducer from './stopwatch/data';

export default combineReducers({
  app: appReducer,
  protocol: protocolReducer,
  pits: pitReducer,
  sw: swReducer
});