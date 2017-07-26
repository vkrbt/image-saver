import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import AddModal from './AddModal.jsx';
import { RouteTransition } from 'react-router-transition';
import './styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }
  componentWillMount() {
    let db = openDatabase("images", "0.1", "A list of to do items.", 200000);
    db.transaction((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS 'images' ('id' INTEGER PRIMARY KEY ASC, 'link' VARCHAR(200) NOT NULL, 'description' VARCHAR(200) NULL, 'date' DATETIME NOT NULL);")
    })
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
    let db = openDatabase("images", "0.1", "A list of to do items.", 200000);
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO images(link, description, date) VALUES(?, ?, ?)`, [item.link, item.description, item.date]);
    });
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
          atEnter={{ translateX: 100 }}
          atLeave={{ translateX: -100 }}
          atActive={{ translateX: 0 }}
          mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
        >
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              anything: this
            })
          })}
        </RouteTransition>
        <AddModal show={this.state.show} onClose={this.onClose} addImage={this.addImage} />
      </div>
    )
  }
}

export default App;