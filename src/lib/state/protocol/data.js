const ADD_PIT = 'PROTO:ADD_PIT';

export function createAddPitToListAction(ident) {
  return {type: ADD_PIT, ident};
}

const defaultState = {
  pitList: []
};

export default function reducer(state=defaultState, action) {
  if (action.type === ADD_PIT) {
    return {...state, pitList: state.pitList.concat([action.ident])};
  }

  return state
}