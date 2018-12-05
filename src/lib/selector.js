export function getSW(state, id) {
  return state.protocol.rests.find(sw => sw.id === id);
}