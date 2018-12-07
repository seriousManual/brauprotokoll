import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import reducer from './lib/state/reducer';
import saga from './lib/state/saga';

import App from './lib/components/App';

import { createPitAddAction } from './lib/state/pit/data';
import {createAddPitToListAction} from './lib/state/protocol/data';

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

store.dispatch(createPitAddAction('foo1', {}))
store.dispatch(createAddPitToListAction('foo1', {}))
store.dispatch(createPitAddAction('foo2', {}))
store.dispatch(createAddPitToListAction('foo2', {}))
store.dispatch(createPitAddAction('foo3', {}))
store.dispatch(createAddPitToListAction('foo3', {}))

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));