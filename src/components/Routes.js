import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from '../pages/home'
import QuestionForm from './QuestionForm'

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={Home} />
  	<Route path="ask" component={QuestionForm} />
  </Route>
);
