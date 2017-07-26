import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router'
import ImageCard from './ImageCard.jsx'
import db from '../db.js'

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
  }
  componentWillMount() {
    this.getImages();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataReloaded) {
      this.getImages();
      this.props.chageStatusOfData();
    }

  }
  getImages = () => {
    db.executeTransaction(`SELECT * FROM images ORDER BY date DESC`).then((res) => {
      res.forEach((item) => {
        db.executeTransaction(`SELECT COUNT(*) FROM comments WHERE image_id=${item.id}`).then((comments) => {
          item.comments = comments[0]['COUNT(*)'];
          this.setState({ images: res });
        })
      })
    });
  }
  render() {
    return (
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
        {this.state.images.length ? this.state.images.map((image) => {
          return (
            <Link key={image.id} to={'image/' + image.id} id={'post' + image.id}>
              <ImageCard image={image.link} description={image.description || '*No description*'} comments={image.comments} isLiked={image.isLiked} id={image.id} />
            </Link>
          )
        }) : <h3 className='empty-data'>Nothing to show</h3>}
      </Col>
    )
  }
}

export default Gallery
