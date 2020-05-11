import { combineReducers } from 'redux'
import { notification } from './notification'
import { blogs } from './blogs'
import { user } from './user'
const reducer = combineReducers({
  notification,
  blogs,
  user
})

export default reducer