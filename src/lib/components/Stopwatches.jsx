import React from 'react';
import {connect} from 'react-redux';

import {createStopwatchAddAction} from '../state/stopwatch/data';

import Stopwatch from './Stopwatch';
import {getSWPrefixed} from '../selector';

function Stopwatches({sw, title, prefix, dispatch}) {
  function create() {
    const ident = prefix + Math.random();
    dispatch(createStopwatchAddAction(ident, 5000, {}))
  }

  return (
    <div>
      <button onClick={create}>add</button>
      {sw.map(sw => <Stopwatch key={sw.ident} ident={sw.ident} />)}
    </div>
  );
}

export default connect((state, ownProps) => {
  return {sw: getSWPrefixed(state, ownProps.prefix)}
})(Stopwatches);