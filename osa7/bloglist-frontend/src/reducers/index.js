import { combineReducers } from 'redux'
import { notification } from './notification'
import { blogs } from './blogs'
import { user } from './user'
import { users } from './users'

const reducer = combineReducers({
  notification,
  blogs,
  user,
  users
})

export default reducer