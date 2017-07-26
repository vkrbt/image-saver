import React, { Component } from 'react'
import { Thumbnail, Col } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import db from '../db.js'
import converter from '../converter.js'

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
  componentWillReceiveProps(nextProps) {
    this.setState({ isLiked: converter.stringToBoolean(nextProps.isLiked) })
  }
  likeClick = (e) => {
    e.preventDefault();
    
    console.log()
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
          <p>
            <FontAwesome name='comment'></FontAwesome>{this.props.comments}
            <button onClick={this.likeClick} className={this.state.isLiked ? 'liked' : ''}>
              <FontAwesome name='heart'></FontAwesome>
            </button>
          </p>
          <p>{this.props.description}</p>
        </Thumbnail>
      </Col>
    )
  }
}

export default ImageCard