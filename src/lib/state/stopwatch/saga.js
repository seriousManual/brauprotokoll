import { call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga';

import { SW_STATE_DONE, createStopwatchStartAction, createStopwatchTickAction } from './data';
import { getSW } from '../../selector';

const SAGA_STOPWATCH_START = 'SAGA:SW:START';

export function createSagaStopwatchStartAction(ident) {
  return { type: SAGA_STOPWATCH_START, ident };
}

export default function* watchStopwatch() {
  yield takeEvery(SAGA_STOPWATCH_START, sagaStopwatchStart)
}

export function* sagaStopwatchStart({ ident }) {
  yield put(createStopwatchStartAction(ident));

  while (true) {
    const sw = yield select(getSW, ident);
    if (sw.state === SW_STATE_DONE) {
      break;
    }

    yield put(createStopwatchTickAction(ident));
    yield call(delay, 1000);
  }
}