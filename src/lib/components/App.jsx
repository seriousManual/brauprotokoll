import React from 'react';
import {connect} from 'react-redux';

import {MashInPit, MashOutPit} from './Pit';
import PitList from './PitList';
import Stopwatch from './Stopwatch';
import Stopwatches from './Stopwatches';
import ModeSwitch from './ModeSwitch';
 
function App() {
  return (
    <div>
      <ModeSwitch />
      <MashInPit />      {/*"Mash In at 55°C"*/}
      <Stopwatches title="Rests" prefix="rest" /> {/*50min at 70°C*/}
      <MashOutPit />     {/*"Mash Out at 67°C"*/}
      
      <Stopwatch ident="lauterRest" />

      <PitList title="First Wort" prefix="firstWort" /> {/*"50g Simcoe", "20g Herkules"*/}
      {/* cooking */}
      <PitList title="Whirlpool" prefix="whirlpool" /> {/*"20g Simcoe", "100g Cascade"*/}

      <Stopwatch ident="iso" />
    </div>
  )
}

export default connect()(App)