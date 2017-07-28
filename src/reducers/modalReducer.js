import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/modal'

const modalReducer = (opened = false, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return true;
    case CLOSE_MODAL:
      return false;
    default:
      return false;
  }
}

export default modalReducer
