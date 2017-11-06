import { combineReducers } from 'redux'

import HeaderReducer from './HeaderReducer'

const rootReducer = combineReducers({
  HeaderReducer: HeaderReducer
})

export default rootReducer