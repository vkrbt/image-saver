import React, { Component } from 'react'
import { Image, Media } from 'react-bootstrap'

class ImagePreview extends Component {
  constructor() {
    super();
    this.state = {
      image: {}
    }
  }
  componentWillMount() {
    this.executeTransaction(`SELECT * FROM images WHERE id=${this.props.params.id}`).then((res) => {
      this.setState({ image: res[0] });
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
      <div>
        <div className='card'>
          <Image src={this.state.image.link} responsive />
          <p className="lead">{this.state.image.description}</p>
        </div>
        <Media>
          <Media.Left>
            <Image width={64} height={64} src="https://react-bootstrap.github.io/assets/thumbnail.png" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>Media Heading</Media.Heading>
            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
          </Media.Body>
        </Media>
      </div>
    )
  }
}

export default ImagePreview