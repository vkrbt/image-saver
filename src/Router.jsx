import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App.jsx'
import ImagePreview from './Gallery/ImagePreview.jsx'
import Gallery from './Gallery/Gallery.jsx'
import NotFound from './NotFound.jsx'

class Routing extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path='/' component={Gallery} />
          <Route path='image/:id' component={ImagePreview} />
          <Route path='/404' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

export default Router
