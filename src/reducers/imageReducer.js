import {
  ADD_IMAGE
} from '../types/images'

const imageReducer = (state = [], action) => {
  if (action.type === ADD_IMAGE) {
    console.log(action)
    return [
      ...state,
      action.data
    ]
  }
  return state
}

export default imageReducer
