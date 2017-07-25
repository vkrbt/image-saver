import React, { Component } from 'react'
import { Thumbnail, Col } from 'react-bootstrap'
class ImageCard extends Component {
  addDefaultSrc = (e) => {
    e.target.src = 'https://blog.sqlauthority.com/i/a/errorstop.png';
  }
  render() {
    return (
      <Col>
        <Thumbnail onError={this.addDefaultSrc} src={this.props.image}>
          <p>{this.props.description}</p>
        </Thumbnail>
      </Col>
    )
  }
}

export default ImageCard