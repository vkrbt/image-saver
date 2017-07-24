import React, { Component } from 'react'
import { Thumbnail, Col } from 'react-bootstrap'
class ImageCard extends Component {
  render() {
    return (
      <Col xs={12} md={4}>
        <Thumbnail src="https://react-bootstrap.github.io/assets/thumbnaildiv.png">
          
        </Thumbnail>
      </Col>
    )
  }
}

export default ImageCard