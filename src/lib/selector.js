export function getSW(state, id) {
  return state.sw.find(sw => sw.id === id);
}

export function getPit(state, id) {
  return state.pit.find(pit => pit.id === id);
}