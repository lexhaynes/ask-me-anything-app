import Redux from 'redux'
import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer.js'
import initialState from './initialState'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

//combine reducers here

let finalCreateStore = compose(
  applyMiddleware(
  	thunk,
  	logger()
  )
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState)
}