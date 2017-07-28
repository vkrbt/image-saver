import {
  ADD_IMAGE
} from '../types/images'

export const addImage = (image) => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    data: image
  })
}
