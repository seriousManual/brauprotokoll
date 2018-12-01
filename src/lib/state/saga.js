import { all } from 'redux-saga/effects'

import swSaga from './stopwatch/saga'

export default function* rootSaga() {
  yield all([
    swSaga()
  ]);
}