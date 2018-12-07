export function getSW(state, id) {
  return state.protocol.rests.find(sw => sw.id === id);
}

export function getPit(state, ident) {
  return state.pits.find(pit => pit.ident === ident);
}

export function getPitPrefixed(state, prefix) {
  return state.pits.filter(pit => {
    return pit.ident.startsWith(prefix);
  });
}

export function getAppMode(state) {
  return state.app.mode;
}