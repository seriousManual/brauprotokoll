import { call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga';

import { SW_STATE_DONE, createStopwatchStartAction, createStopwatchUpdateAction } from './data';
import { getSW } from '../../selector';

const SAGA_STOPWATCH_START = 'SAGA:SW:START';

export function createSagaStopwatchStartAction(id) {
  return { type: SAGA_STOPWATCH_START, id };
}

export default function* watchStopwatch() {
  yield takeEvery(SAGA_STOPWATCH_START, sagaStopwatchStart)
}

export function* sagaStopwatchStart({ id }) {
  yield put(createStopwatchStartAction(id));

  while (true) {
    const sw = yield select(getSW, id);
    if (sw.state === SW_STATE_DONE) {
      break;
    }

    yield put(createStopwatchUpdateAction(id));
    yield call(delay, 1000);
  }
}