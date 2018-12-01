import React from 'react';
import {connect} from 'react-redux';

import {createSagaStopwatchStartAction} from '../state/stopwatch/saga';

function Stopwatch({id, state, timeLeft, dispatch}) {
  return <div>
    {state} - 
    {timeLeft} - 
    <button onClick={() => dispatch(createSagaStopwatchStartAction(id))}>
      start
    </button>
  </div>;
}

export default connect((state, props) => {
  return state.sw.find(sw => sw.id === props.id)
})(Stopwatch);