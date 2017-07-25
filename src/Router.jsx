import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router';
import App from './App.jsx';
import ImagePreview from './ImagePreview.jsx';
import ImageCards from './ImageCards.jsx';

class Routing extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path='/' component={ImageCards}/>
          <Route path='image/:id' component={ImagePreview} />
        </Route>
      </Router>
    )
  }
}

export default Routing