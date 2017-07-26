import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import AddModal from './AddModal.jsx'
import { RouteTransition } from 'react-router-transition'
import db from './db.js'
import './assets/styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }
  componentWillMount() {
    db.executeTransaction(`CREATE TABLE IF NOT EXISTS 'images'
      ('id' INTEGER PRIMARY KEY ASC, 'link' VARCHAR(200) NOT NULL, 'description' VARCHAR(200) NULL, 'date' DATETIME NOT NULL, 'isLiked' BOOLEAN DEFAULT FALSE);`);
    db.executeTransaction(`CREATE TABLE IF NOT EXISTS 'comments'
      ('id' INTEGER PRIMARY KEY ASC, 'image_id' INTEGER NOT NULL, 'text' VARCHAR(200) NOT NULL);`)
  }
  openModal = () => {
    this.setState({ show: true });
  }
  onClose = () => {
    this.setState({ show: false });
  }
  addImage = (item) => {
    this.setState({ show: false });
    this.addToDb(item);
  }
  addToDb(item) {
    item.date = Date.now();
    db.executeTransaction(`INSERT INTO images(link, description, date) VALUES(${item.link}, ${item.description}, ${item.date})`)
  }
  render() {
    return (
      <div className="container">
        <Navbar fixedTop collapseOnSelect={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Images</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text pullRight>
              <Button
                bsStyle="primary"
                onClick={this.openModal}
              >
                <FontAwesome name='plus' />
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <RouteTransition
          pathname={this.props.location.pathname}
          atEnter={{ scale: 0, opacity: 0 }}
          atLeave={{ scale: 0, opacity: 0 }}
          atActive={{ scale: 1, opacity: 1 }}
          mapStyles={styles => ({ transform: `scale(${styles.scale})`, opacity: styles.opacity })}
        >
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              anything: ''
            })
          })}
        </RouteTransition>
        <AddModal show={this.state.show} onClose={this.onClose} addImage={this.addImage} />
      </div>
    )
  }
}

export default App