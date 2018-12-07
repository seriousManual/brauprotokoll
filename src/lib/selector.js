export function getSW(state, id) {
  return state.protocol.rests.find(sw => sw.id === id);
}

export function getPit(state, ident) {
  return state.pits.find(pit => pit.ident === ident);
}

export function getAppMode(state) {
  return state.app.mode;
}