/**
 * App entry point
 */

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import Routes from './components/Routes'
//redux
import configureStore from './redux/store'
import { Provider } from 'react-redux'
import initialState from './redux/initialState'

//for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';



// ID of the DOM element to mount app on
const DOM_ID = 'app'

//redux store
let store = configureStore(initialState())

injectTapEventPlugin();

// Render the router
ReactDOM.render((
<Provider store={store}>
  <Router history={browserHistory}>
    {Routes}
  </Router>
 </Provider>
), document.getElementById(DOM_ID))

