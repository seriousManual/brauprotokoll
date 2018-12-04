import React from 'react';
import {connect} from 'react-redux';

import {createPitAddAction} from '../state/pit/data';

import Pit from './Pit';

function Pits({pits, dispatch}) {
  return (
    <div>
      <h1>pits</h1>
      <button onClick={() => dispatch(createPitAddAction({}))}>add</button>
      {pits.map(pit => <Pit key={pit.id} id={pit.id} />)}
    </div>
  );
}

export default connect(state => {
  return {pits: state.pits}
})(Pits);