import uuid from 'uuid/v4';
import moment from 'moment';
import prettyMs from 'pretty-ms';

export const SW_STATE_PENDING = 'SW:PENDING';
export const SW_STATE_ACTIVE = 'SW:ACTIVE';
export const SW_STATE_DONE = 'SW:DONE';

const STOPWATCH_ADD = 'SW:ADD';
const STOPWATCH_START = 'SW:START';
const STOPWATCH_UPDATE = 'SW:UPDATE';

export function createStopwatchAddAction(duration, payload) {
  return {type: STOPWATCH_ADD, duration, payload};
}

export function createStopwatchStartAction(id) {
  return {type: STOPWATCH_START, id};
}

export function createStopwatchUpdateAction(id, duration=null, payload=null) {
  return {type: STOPWATCH_UPDATE, id, payload, duration};
}

export default function reducer(state=[], action) {
  if (action.type === STOPWATCH_ADD) {
    return state.concat([createStopwatch(action.duration, action.payload)]);
  }

  if (action.type === STOPWATCH_START) {
    return state.map(sw => {
      if (sw.id !== action.id) return sw;

      return {
        ...sw,
        state: SW_STATE_ACTIVE,
        startTime: (new Date()).toISOString()
      }
    });
  }

  if (action.type === STOPWATCH_UPDATE) {
    return state.map(sw => {
      if (sw.id !== action.id) return sw;

      const duration = action.duration || sw.duration;
      const elapsedSinceStart = moment().diff(sw.startTime);
      const timeLeft = duration - elapsedSinceStart;

      return {
        ...sw,
        state: timeLeft <= 0 ? SW_STATE_DONE : SW_STATE_ACTIVE,
        timeLeft: prettyMs(timeLeft),
        payload: action.payload || sw.payload,
        duration
      };
    });
  }

  return state;
}

function createStopwatch(duration, payload) {
  return {
    id: uuid(),
    state: SW_STATE_PENDING,
    startTime: null,
    timeLeft: null,
    payload,
    duration
  };
}