// import { createStore } from 'redux'

import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk'

const mw = applyMiddleware(Thunk)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import RootReducer from '../reducers'
const store = createStore(RootReducer, composeEnhancers(mw))

export default store