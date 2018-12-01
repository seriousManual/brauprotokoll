export function getSW(state, id) {
  return state.sw.find(sw => sw.id === id)
}