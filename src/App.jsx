import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import AddModal from './AddModal.jsx'
import './styles.css'

class App extends Component {
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
                onClick={() => this.setState({ show: true })}
              >
                +
            </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        <AddModal show={this.show} />
      </div>

    )
  }
}

export default App;