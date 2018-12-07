import React from 'react';
import {connect} from 'react-redux';

import Pit from './Pit';
import PitList from './PitList';
import ModeSwitch from './ModeSwitch';
 
function App() {
  return (
    <div>
      <ModeSwitch />
      <Pit ident="mashIn" />
      <Pit ident="mashOut" />
      <PitList prefix="foo" />
      <Pit ident="beerIn" />
      <Pit ident="beerOut" />
    </div>
  )
}

export default connect()(App)