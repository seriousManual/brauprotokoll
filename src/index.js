import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import ms from 'ms';

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import App from './lib/components/App';

import { createPitAddAction } from './lib/state/pit/data';
import {createStopwatchAddAction} from './lib/state/stopwatch/data';

let preexistingState = localStorage.getItem('berthold');
if (preexistingState) {
  preexistingState = JSON.parse(preexistingState);
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, preexistingState || {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

store.subscribe(() => {
  localStorage.setItem('berthold', JSON.stringify(store.getState()));
});

if (!preexistingState) {
  store.dispatch(createPitAddAction('mashIn', {temp: 50}))
  store.dispatch(createPitAddAction('mashOut', {temp: 78}))

  store.dispatch(createStopwatchAddAction('lauterRest', ms('15m'), {}));
  store.dispatch(createStopwatchAddAction('iso', ms('10m'), {}));
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));