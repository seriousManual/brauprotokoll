export const APP_MODE_EDIT = 'APP:MODE:EDIT';
export const APP_MODE_BREW = 'APP:MODE:BREW';

const APP_SET_MODE = 'APP:MODE';

export function createSetModeAction(mode) {
  return {type: APP_SET_MODE, mode};
}

// Celsius vs Fahrenheit
// gr vs lbs

const defaultState = {
  mode: APP_MODE_EDIT
};

export default function (state=defaultState, action) {
  if (action.type === APP_SET_MODE) {
    return {...state, mode: action.mode};
  }

  return state;
}