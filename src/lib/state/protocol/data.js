import swReducer from '../stopwatch/data';


const PIT_ADD = 'PIT:ADD';
const PIT_SET = 'PIT:SET';

export function createPitAddAction(ident, payload) {
  return {type: PIT_ADD, ident, payload};
}

export function createPitSetAction(ident) {
  return {type: PIT_SET, ident};
}

const defaultState = {
  rests: []
};

export default function reducer(state=defaultState, action) {
  if (action.type === PIT_ADD) {
    return {...state, [action.ident]: createPit(action.payload)};
  }

  if (action.type === PIT_SET) {
    const oldPit = state[action.ident];
    if (oldPit) {
      return {...state, [action.ident]: {...oldPit, pointInTime: (new Date()).toISOString()}}
    }
  }

  return {...state, rests: swReducer(state.rests, action)};
}


function createPit(payload) {
  return {
    pointInTime: null,
    payload
  };
}