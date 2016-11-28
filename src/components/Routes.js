import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from '/pages/home'
import Admin from '/pages/admin'

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={Home} />
  	<Route path="/admin" component={Admin} />
  </Route>
);
