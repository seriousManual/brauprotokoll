const PIT_ADD = 'PIT:ADD';
const PIT_SET = 'PIT:SET';
const PIT_ACTIVATION = 'PIT:ACTIVATION';
const PIT_CLEARANCE = 'PIT:CLEARANCE';

export function createPitAddAction(ident, payload) {
  return {type: PIT_ADD, ident, payload};
}

export function createPitSetAction(ident) {
  return {type: PIT_SET, ident};
}

export function createPitActivationAction(ident, flag) {
  return {type: PIT_ACTIVATION, ident, flag};
}

export function createPitClearanceAction(ident, flag) {
  return {type: PIT_CLEARANCE, ident, flag};
}

export default function reducer(state=[], action) {
  if (action.type === PIT_ADD) {
    return state.concat([createPit(action.ident, action.payload)]);
  }

  if (action.type === PIT_SET) {
    return _handlePitForIdent(state, action.ident, pit => {
      return {...pit, pointInTime: (new Date()).toISOString()}
    });
  }

  if (action.type === PIT_ACTIVATION) {
    return _handlePitForIdent(state, action.ident, pit => {
      return {...pit, activated: action.flag}
    });
  }

  if (action.type === PIT_CLEARANCE) {
    return _handlePitForIdent(state, action.ident, pit => {
      return {...pit, clearance: action.flag}
    });
  }

  return state;
}

function createPit(ident, payload) {
  return {
    ident,
    payload,
    activated: false,
    clearance: false,
    pointInTime: null
  };
}

function _handlePitForIdent(state, ident, handler) {
  return state.map(pit => pit.ident !== ident ? pit : handler(pit));
}