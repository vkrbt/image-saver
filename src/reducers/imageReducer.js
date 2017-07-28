import {
  ADD_IMAGE
} from '../types/images'

const imageReducer = (state = [], action) => {
  switch (action.type){
    case ADD_IMAGE:
      return [
        ...state,
        action.data
      ];
    default: return state;
  }
}

export default imageReducer