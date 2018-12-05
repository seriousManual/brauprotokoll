import React from 'react';
import {connect} from 'react-redux';

import {createPitSetAction, createPitAddAction} from '../state/protocol/data';

function Pit({pointInTime, payload, onActivate, onSet}) {
  return <div>
    {pointInTime} - {payload}
    {payload ? <button onClick={() => onSet()}>set</button> : null}
    {!payload ? <button onClick={() => onActivate()}>activate</button> : null}
  </div>;
}

export default connect(
  (state, ownProps) => state.protocol[ownProps.ident] || {},
  (dispatch, ownProps) => ({
    onSet: () => dispatch(createPitSetAction(ownProps.ident)),
    onActivate: () => dispatch(createPitAddAction(ownProps.ident, 'foo'))
  })
)(Pit)