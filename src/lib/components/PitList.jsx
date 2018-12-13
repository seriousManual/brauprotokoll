import React from 'react';
import { connect } from 'react-redux';

import { APP_MODE_EDIT, APP_MODE_BREW } from '../state/app/data';
import { createPitAddAction } from '../state/pit/data';
import { getPitPrefixed, getAppMode } from '../selector';
import { CookingPit } from './Pit';

function PitList({ title, pits, appMode, prefix, dispatch }) {
  function addNewPitToList() {
    const ident = prefix + '_' + Math.random();
    dispatch(createPitAddAction(ident, { amount: 0, hops: '' }, true));
  }

  if (appMode === APP_MODE_BREW && pits.length === 0) {
    return null;
  }

  return <div>
    <h3>
      {title}
      {appMode === APP_MODE_EDIT ? 
        <button onClick={addNewPitToList}>add</button> :
        null}
    </h3>

    {pits.map(pit => <CookingPit ident={pit.ident} key={pit.ident} />)}
  </div>
}

export default connect((state, ownProps) => {
  return {
    pits: getPitPrefixed(state, ownProps.prefix),
    appMode: getAppMode(state)
  };
})(PitList);