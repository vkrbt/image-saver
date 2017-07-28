import {
  ADD_IMAGE
} from '../types/images'

export const addImage = (obj) => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    data: obj
  })
}
