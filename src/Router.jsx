import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router';
import App from './App.jsx';
import ImagePreview from './ImagePreview.jsx';
import Gallery from './Gallery.jsx';

class Routing extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
            <Route className='route-wrapper' path='/' component={Gallery} />
            <Route className='route-wrapper' path='image/:id' component={ImagePreview} />
        </Route>
      </Router>
    )
  }
}

export default Routing