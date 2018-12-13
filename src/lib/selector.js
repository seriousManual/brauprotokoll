export function getSW(state, ident) {
  return state.sw.find(sw => sw.ident === ident);
}

export function getSWPrefixed(state, prefix) {
  return state.sw.filter(sw => sw.ident.startsWith(prefix));
}

export function getPit(state, ident) {
  return state.pits.find(pit => pit.ident === ident);
}

export function getPitPrefixed(state, prefix) {
  return state.pits.filter(pit => pit.ident.startsWith(prefix));
}

export function getAppMode(state) {
  return state.app.mode;
}