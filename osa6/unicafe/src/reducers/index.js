import { combineReducers } from 'redux'

import { counterReducer } from './CounterReducer'

const index = combineReducers({
    counter: counterReducer
})

export default index