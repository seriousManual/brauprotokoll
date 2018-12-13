const PIT_ADD = 'PIT:ADD';
const PIT_SET = 'PIT:SET';
const PIT_UPDATE = 'PIT:UPDATE';
const PIT_UPDATE_PAYLOAD = 'PIT:UPDATE:PAYLOAD';
const PIT_REMOVE = 'PIT:REMOVE';

export function createPitAddAction(ident, payload, activated) {
  return { type: PIT_ADD, ident, payload, activated };
}

export function createPitSetAction(ident) {
  return { type: PIT_SET, ident };
}

export function createPitActivationAction(ident, activated) {
  return { type: PIT_UPDATE, ident, payload: { activated } };
}

export function createPitClearanceAction(ident, clearance) {
  return { type: PIT_UPDATE, ident, payload: { clearance } };
}

export function createPitPayloadAction(ident, payload) {
  return { type: PIT_UPDATE_PAYLOAD, ident, payload: { payload } };
}

export function createPitRemoveAction(ident) {
  return { type: PIT_REMOVE, ident };
}

export default function reducer(state = [], action) {
  if (action.type === PIT_ADD) {
    return state.concat([createPit(action.ident, action.payload, action.activated)]);
  }

  if (action.type === PIT_SET) {
    return _handlePitForIdent(state, action.ident, pit => {
      return { ...pit, pointInTime: (new Date()).toISOString() }
    });
  }

  if (action.type === PIT_UPDATE) {
    return _handlePitForIdent(state, action.ident, pit => {
      return { ...pit, ...action.payload };
    });
  }

  if (action.type === PIT_UPDATE_PAYLOAD) {
    return _handlePitForIdent(state, action.ident, pit => {
      const currentPayload = pit.payload;
      return { ...pit, payload: {...currentPayload, ...action.payload.payload } };
    });
  }

  if (action.type === PIT_REMOVE) {
    return state.filter(pit => pit.ident !== action.ident);
  }

  return state;
}

function createPit(ident, payload, activated=false) {
  return {
    ident,
    payload,
    activated,
    clearance: false,
    pointInTime: null
  };
}

function _handlePitForIdent(state, ident, handler) {
  return state.map(pit => pit.ident !== ident ? pit : handler(pit));
}