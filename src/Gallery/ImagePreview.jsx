import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Image } from 'react-bootstrap'
import Comments from '../Comments/Comments.jsx'
import db from '../db.js'

class ImagePreview extends Component {
  constructor() {
    super();
    this.state = {
      image: {}
    }
  }
  componentWillMount() {
    db.executeTransaction(`SELECT * FROM images WHERE id=${this.props.params.id}`).then((res) => {
      if (!res.length) {
        browserHistory.push('/404')
      } else {
        this.setState({ image: res[0] });
      }
    });
  }
  render() {
    return (
      <div className='inner-transition'>
        <div className='card'>
          <Image src={this.state.image.link} responsive />
          <p className="lead">{this.state.image.description}</p>
        </div>
        <Comments imageId={this.props.params.id}/>
      </div>
    )
  }
}

export default ImagePreview