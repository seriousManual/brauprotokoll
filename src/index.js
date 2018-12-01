import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import Stopwatches from './lib/components/Stopwatches';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

store.subscribe(foo => {
  console.log(store.getState())
})

ReactDOM.render((
  <Provider store={store}>
    <Stopwatches />
  </Provider>
), document.getElementById('root'));