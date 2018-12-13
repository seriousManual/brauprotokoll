import React from 'react';
import {connect} from 'react-redux';

import {createSetModeAction, APP_MODE_EDIT, APP_MODE_BREW} from '../state/app/data';
import {getAppMode} from '../selector';

function ModeSwitch ({dispatch, mode}) {
  function handleChange(e) {
    dispatch(createSetModeAction(e.target.checked ? APP_MODE_EDIT : APP_MODE_BREW))
  }

  return (
    <div>
      edit mode <input type="checkbox" defaultChecked={mode === APP_MODE_EDIT} onChange={handleChange} />
    </div>
  )
}

export default connect(state => {
  return {mode: getAppMode(state)}
})(ModeSwitch)