import React, { Component } from 'react'
import { Thumbnail, Col } from 'react-bootstrap'
import db from '../common/db.js'
import converter from '../common/converter.js'

class ImageCard extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false
    }
  }
  addDefaultSrc = (e) => {
    e.target.src = 'https://blog.sqlauthority.com/i/a/errorstop.png';
  }
  likeClick = (e) => {
    e.preventDefault()
    db.executeTransaction(`UPDATE images SET isLiked='${converter.booleanToString(!this.state.isLiked)}' WHERE id=${this.props.id}`).then(
      () => {
        this.setState({ isLiked: !this.state.isLiked });
      }
    )
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