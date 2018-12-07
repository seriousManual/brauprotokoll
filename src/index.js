import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import App from './lib/components/App';

import { createPitAddAction } from './lib/state/pit/data';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

store.subscribe(foo => {
  console.log(store.getState())
})

store.dispatch(createPitAddAction('mashIn', {}))
store.dispatch(createPitAddAction('mashOut', {}))
store.dispatch(createPitAddAction('beerIn', {}))
store.dispatch(createPitAddAction('beerOut', {}))

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));