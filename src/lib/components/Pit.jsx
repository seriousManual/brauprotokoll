import React from 'react';
import {connect} from 'react-redux';

import {createPitSetAction} from '../state/pit/data';

function Pit({id, pointInTime, dispatch}) {
  return <div>
    {pointInTime} - 
    <button onClick={() => dispatch(createPitSetAction(id))}>
      set
    </button>
  </div>;
}

export default connect((state, props) => {
  return state.pits.find(pit => pit.id === props.id)
})(Pit);