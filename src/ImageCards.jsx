import React, { Component } from 'react'
import ImageCard from './ImageCard.jsx'
import { Col } from 'react-bootstrap'

class ImageCards extends Component {
  constructor() {
    super();
    this.images = [];
  }
  render() {
    return (
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
        {this.props.images.map((image, index) => {
          return <ImageCard key={index} image={image.link} description={image.description} />
        })}
      </Col>
    )
  }
}

export default ImageCards