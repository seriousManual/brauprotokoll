import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import Stopwatches from './lib/components/Stopwatches';
import Pits from './lib/components/Pits';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

store.subscribe(foo => {
  console.log(store.getState())
})

ReactDOM.render((
  <Provider store={store}>
    <React.Fragment>
      <Stopwatches />
      <Pits />
    </React.Fragment>
  </Provider>
), document.getElementById('root'));