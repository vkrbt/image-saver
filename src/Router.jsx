import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App.jsx'
import ImagePreview from './components/ImagePreview'
import Gallery from './containers/Gallery'
import NotFound from './components/NotFound'

const Routing = (
  <Router history={browserHistory}>
    <Route component={App}>
    <Route path='/' component={Gallery} />
    <Route path='image/:id' component={ImagePreview} />
    <Route path='/404' component={NotFound} />
  </Route>
  </Router>
)

export default Routing
