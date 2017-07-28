import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/modal'

const modalReducer = (opened = false, action) => {
  if (action.type === OPEN_MODAL) {
    return true
  }
  if (action.type === CLOSE_MODAL) {
    return false
  }
  return opened
}

export default modalReducer
