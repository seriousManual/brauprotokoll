import React from 'react';
import {connect} from 'react-redux';

import {getPit, getAppMode} from '../selector';

import {
  createPitSetAction, createPitClearanceAction, createPitActivationAction
} from '../state/pit/data';
import {APP_MODE_BREW, APP_MODE_EDIT} from '../state/app/data';

function Pit({appMode, ident, activated, clearance, pointInTime, payload, onActivate, onSet, onClear}) {
  if (appMode === APP_MODE_BREW) {
    if (!activated) {
      return null;
    }

    return <div>
      {ident} - 
      {clearance ? 'CLEAR' : 'NOT CLEAR'} - 
      {pointInTime || null}
      
      {clearance && !pointInTime ? <button onClick={onSet}>set</button> : null}
      {!clearance ? <button onClick={onClear}>clear</button> : null}
    </div>
  } else if (appMode === APP_MODE_EDIT) {
    return <div>
      {ident}<button onClick={() => onActivate(!activated)}>{activated ? 'deactivate' : 'activate'}</button>
    </div>
  }
}

export default connect(
  (state, ownProps) => {
    const pit = getPit(state, ownProps.ident) || {};
    const appMode = getAppMode(state);

    return {...pit, appMode};
  },
  (dispatch, ownProps) => ({
    onSet: () => dispatch(createPitSetAction(ownProps.ident)),
    onActivate: flag => dispatch(createPitActivationAction(ownProps.ident, flag)),
    onClear: () => dispatch(createPitClearanceAction(ownProps.ident, true))
  })
)(Pit)