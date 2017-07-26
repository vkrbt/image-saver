import React, { Component } from 'react'
import { Image, Media } from 'react-bootstrap'

class Comments extends Component {
  render() {
    return (
      <Media>
        <Media.Left>
          <Image width={64} height={64} src="https://pbs.twimg.com/profile_images/824716853989744640/8Fcd0bji.jpg" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>Anonymous</Media.Heading>
          <p>{this.props.comment}</p>
        </Media.Body>
      </Media>
    )
  }
}

export default Comments