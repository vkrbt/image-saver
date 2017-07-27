import React from 'react'
import ReactDOM from 'react-dom'
import Routing from './Router.jsx'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

function modalReducer(opened = false, action) {
  //console.log(opened, action)
  if (action.type === 'OPEN_MODAL') {
    return true
  }
  if (action.type === 'CLOSE_MODAL') {
    return false
  }
  return opened
}
function imageReducer(state = [], action) {
  if (action.type === 'ADD_IMAGE') {
    console.log(state)
    return [
      ...state,
      action.newImage
    ]
  }
  return state
}

const reducers = combineReducers({
  modalReducer: modalReducer,
  imageReducer: imageReducer,
})

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;
const store = createStore(reducers, {}, enhancers)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: 'OPEN_MODAL' })
store.dispatch({ type: 'CLOSE_MODAL' })
store.dispatch({ type: 'ADD_IMAGE', newImage: 'lol' })
store.dispatch({ type: 'ADD_IMAGE', newImage: 'lol' })



const Root = (
  <Provider store={store}>
    <Routing />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root')
)
