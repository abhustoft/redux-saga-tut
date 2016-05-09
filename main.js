import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './sagas'
import rootSaga from './sagas'


import Counter from './Counter'
import reducer from './reducers'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(helloSaga)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

const rendering = () => {console.log(store.getState()); return store.getState()};

function render() {
  ReactDOM.render(
    <Counter
      value={rendering()}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
