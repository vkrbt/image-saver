import { combineReducers } from 'redux'

import imageReducer from './imageReducer'
import modalReducer from './modalReducer'

const reducers = combineReducers({
  modalReducer: modalReducer,
  imageReducer: imageReducer
})

export default reducers
