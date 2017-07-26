import React, { Component } from 'react'
import {Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router'

class NotFound extends Component {
  render () {
    return (
      <div>
        <Jumbotron>
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <p>Sorry, an error has occured, Requested page not found!</p>
          <Link to='/'>
            <Button bsStyle='primary'>Home</Button>
          </Link>
        </Jumbotron>
      </div>
    )
  }
}

export default NotFound