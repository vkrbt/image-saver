import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { openModal } from './actions/modal'
import db from './db.js'
import './assets/styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = { show: false, reloaded: false };
  }
  componentWillMount() {
    db.executeTransaction(`CREATE TABLE IF NOT EXISTS 'images'
      ('id' INTEGER PRIMARY KEY ASC, 'link' VARCHAR(200) NOT NULL, 'description' VARCHAR(200) NULL, 'date' DATETIME NOT NULL, 'isLiked' BOOLEAN DEFAULT FALSE);`);
    db.executeTransaction(`CREATE TABLE IF NOT EXISTS 'comments'
      ('id' INTEGER PRIMARY KEY ASC, 'image_id' INTEGER NOT NULL, 'text' VARCHAR(200) NOT NULL);`)
  }
  openModal = () => {
    //this.setState({ show: true });
    this.props.openModal()
  }
  onClose = () => {
    this.props.closeModal()
  }
  addImage = (item) => {
    this.setState({ show: false, reloaded: true });
    this.addToDb(item);
  }
  addToDb(item) {
    item.date = Date.now();
    db.executeTransaction(`INSERT INTO images(link, description, date) VALUES('${item.link}', '${item.description}', ${item.date})`)
  }
  chageStatus = () => {
    this.setState({ reloaded: false });
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
                className='rotating'
                bsStyle="primary"
                onClick={this.openModal}
              >
                <FontAwesome name='plus' />
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            dataReloaded: this.state.reloaded,
            chageStatusOfData: this.chageStatus
          })
        })}
      </div>
    )
  }
}

const mapDispathToProps = (dispath) => {
  return {
    openModal: () => openModal()(dispath)
  }
}

export default connect(null, mapDispathToProps)(App)