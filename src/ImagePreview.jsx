import React, { Component } from 'react'

class ImagePreview extends Component {
  render () {
    return (
      <div>
        {this.props.params.id}
      </div>
    )
  }
}

export default ImagePreview