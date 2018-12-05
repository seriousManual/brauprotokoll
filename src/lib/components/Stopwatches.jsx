import React from 'react';
import {connect} from 'react-redux';

import {createStopwatchAddAction} from '../state/stopwatch/data';

import Stopwatch from './Stopwatch';

function Stopwatches({sw, dispatch}) {
  return (
    <div>
      <h1>stopwatches</h1>
      <button onClick={() => dispatch(createStopwatchAddAction(5000, {}))}>add</button>
      {sw.map(sw => <Stopwatch key={sw.id} id={sw.id} />)}
    </div>
  );
}

export default connect(state => {
  return {sw: state.protocol.rests}
})(Stopwatches);