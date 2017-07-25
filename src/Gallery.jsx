import React, { Component } from 'react'
import ImageCard from './ImageCard.jsx'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router'

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
  }
  componentWillMount() {
    this.executeTransaction(`SELECT * FROM images ORDER BY date DESC`).then((res) => {
      this.setState({ images: res });
    });
  }
  componentWillReceiveProps() {
    this.executeTransaction(`SELECT * FROM images ORDER BY date DESC`).then((res) => {
      this.setState({ images: res });
    });
  }
  executeTransaction(query) {
    let db = openDatabase("images", "0.1", "A list of to do items.", 2 * 1024 * 1024);
    return new Promise(function (resolve, reject) {
      db.transaction(function (transaction) {
        transaction.executeSql(query, [], function (transaction, result) {
          resolve([...result.rows]);
        });
      });
    });
  }
  render() {
    return (
      <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
        {this.state.images.map((image, index) => {
          return (
            <Link key={image.id} to={'image/' + image.id} id={'post' + image.id}>
              <ImageCard image={image.link} description={image.description || '*No description*'} />
            </Link>
          )
        })}
      </Col>
    )
  }
}

export default Gallery