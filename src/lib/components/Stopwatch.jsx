import React from 'react';
import {connect} from 'react-redux';

import {createSagaStopwatchStartAction} from '../state/stopwatch/saga';
import {getSW} from '../selector';

function Stopwatch({ident, state, timeLeft, dispatch}) {
  return <div>
    {state} - 
    {timeLeft} - 
    <button onClick={() => dispatch(createSagaStopwatchStartAction(ident))}>
      start
    </button>
  </div>;
}

export default connect((state, props) => getSW(state, props.ident))(Stopwatch);