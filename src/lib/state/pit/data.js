import uuid from 'uuid/v4';

const PIT_ADD = 'PIT:ADD';
const PIT_SET = 'PIT:SET';

export function createPitAddAction(payload) {
  return {type: PIT_ADD, payload};
}

export function createPitSetAction(id) {
  return {type: PIT_SET, id};
}

export default function reducer(state=[], action) {
  if (action.type === PIT_ADD) {
    return state.concat([createPit(action.payload)]);
  }

  if (action.type === PIT_SET) {
    return state.map(pit => {
      if (pit.id !== action.id) return pit;

      return {...pit, pointInTime: (new Date()).toISOString()};
    });
  }

  return state;
}

function createPit(payload) {
  return {
    id: uuid(),
    pointInTime: null,
    payload
  };
}