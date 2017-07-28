import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router'
import AddModal from '../AddModal'
import ImageCard from './ImageCard.jsx'
import { closeModal } from '../actions/modal'
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
    db.executeTransaction(`SELECT * FROM images ORDER BY date DESC`)
      .then((res) => {
        res.forEach((item) => {
          db.executeTransaction(`SELECT COUNT(*) FROM comments WHERE image_id=${item.id}`)
            .then((comments) => {
              item.comments = comments[0]['COUNT(*)'];
              this.setState({ images: res });
            })
        })
      });
  }
  render() {
    return (
      <div>
        <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
          {this.props.images.length ? this.props.images.map((image, index) => {
            return (
              <Link key={index}>
                <ImageCard image={image.link} description={image.description || '*No description*'}/>
              </Link>
            )
          }) : <h3 className='empty-data'>Nothing to show</h3>}
        </Col>
        <AddModal show={this.props.show} onClose={this.props.onClose} />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    show: store.modalReducer,
    images: store.imageReducer.sort((a, b) => b.date-a.date)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => closeModal()(dispatch),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Gallery)
