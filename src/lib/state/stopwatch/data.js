import moment from 'moment';
import prettyMs from 'pretty-ms';

export const SW_STATE_PENDING = 'SW:PENDING';
export const SW_STATE_ACTIVE = 'SW:ACTIVE';
export const SW_STATE_DONE = 'SW:DONE';

const STOPWATCH_ADD = 'SW:ADD';
const STOPWATCH_START = 'SW:START';
const STOPWATCH_UPDATE = 'SW:UPDATE';
const STOPWATCH_TICK = 'SW:TICK';
const STOPWATCH_UPDATE_PAYLOAD = 'SW:UPDATE:PAYLOAD';
const STOPWATCH_REMOVE = 'SW:REMOVE';

export function createStopwatchAddAction(ident, duration, payload) {
  return { type: STOPWATCH_ADD, ident, duration, payload };
}

export function createStopwatchStartAction(ident) {
  return { type: STOPWATCH_START, ident };
}

export function createStopwatchTickAction(ident) {
  return { type: STOPWATCH_TICK, ident };
}

export function createStopwatchActivationAction(ident, activated) {
  return { type: STOPWATCH_UPDATE, ident, payload: { activated } };
}

export function createStopwatchClearanceAction(ident, clearance) {
  return { type: STOPWATCH_UPDATE, ident, payload: { clearance } };
}

export function createStopwatchPayloadAction(ident, payload) {
  return { type: STOPWATCH_UPDATE_PAYLOAD, ident, payload: { payload } };
}

export function createStopwatchRemoveAction(ident) {
  return { type: STOPWATCH_REMOVE, ident };
}

export default function reducer(state = [], action) {
  if (action.type === STOPWATCH_ADD) {
    return state.concat([createStopwatch(action.ident, action.duration, action.payload)]);
  }

  if (action.type === STOPWATCH_UPDATE) {
    return state.map(sw => {
      if (sw.ident !== action.ident) return sw;

      return { ...sw, ...action.payload };
    })
  }

  if (action.type === STOPWATCH_UPDATE_PAYLOAD) {
    return state.map(sw => {
      if (sw.ident !== action.ident) return sw;

      const currentPayload = sw.payload;
      return { ...sw, payload: { ...currentPayload, ...action.payload.payload } };
    })
  }

  if (action.type === STOPWATCH_START) {
    return state.map(sw => {
      if (sw.ident !== action.ident) return sw;

      return {
        ...sw,
        state: SW_STATE_ACTIVE,
        startTime: (new Date()).toISOString()
      };
    });
  }

  if (action.type === STOPWATCH_TICK) {
    return state.map(sw => {
      if (sw.ident !== action.ident) return sw;

      const elapsedSinceStart = moment().diff(sw.startTime);
      let timeLeft = sw.duration - elapsedSinceStart;
      timeLeft = Math.round(timeLeft / 1000) * 1000;

      return {
        ...sw,
        state: timeLeft <= 0 ? SW_STATE_DONE : SW_STATE_ACTIVE,
        timeLeft: prettyMs(timeLeft)
      };
    });
  }

  if (action.type === STOPWATCH_REMOVE) {
    return state.filter(sw => sw.ident !== action.ident);
  }

  return state;
}

function createStopwatch(ident, duration, payload, activated = false) {
  return {
    ident,
    payload,
    activated,
    clearance: false,
    state: SW_STATE_PENDING,
    duration,
    startTime: null,
    timeLeft: null
  };
}