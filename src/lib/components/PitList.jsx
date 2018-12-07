import React from 'react';
import {connect} from 'react-redux';

import {getPitPrefixed} from '../selector';
import Pit from './Pit';

function PitList(props) {
  return <div>
    {props.pits.map(pit => <Pit ident={pit.ident} key={pit.ident} />)}
  </div>
}

export default connect((state, ownProps) => {
  return {pits: getPitPrefixed(state, ownProps.prefix)}
})(PitList);