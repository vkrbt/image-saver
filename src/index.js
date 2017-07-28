import React from 'react'
import ReactDOM from 'react-dom'
import Routing from './Router.jsx'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/index'

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
const store = createStore(reducers, {}, enhancers)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

const Root = (
  <Provider store={store}>
    {Routing}
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
