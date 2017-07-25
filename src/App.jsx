import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import AddModal from './AddModal.jsx';
import './styles.css'

class App extends Component {
  constructor() {
    super();
    this.state = { show: false };
    this.images = [];
  }
  openModal = () => {
    this.setState({ show: true });
  }
  onClose = () => {
    this.setState({ show: false });
  }
  addImage = (item) => {
    this.setState({ show: false });
    console.log(this);
    this.images.push(item);
  }
  render() {
    return (
      <div className="container">
        <Navbar fixedTop={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Images</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to='/image/active'>
                <NavItem>Image</NavItem>
              </LinkContainer>
            </Nav>
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
        {this.props.children && React.cloneElement(this.props.children, {
          images: this.images
        })}
        <AddModal show={this.state.show} onClose={this.onClose} addImage={this.addImage} />
      </div>
    )
  }
}

export default App;