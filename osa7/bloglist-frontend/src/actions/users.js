import { getUsers } from '../services/users'

const initUsers = () => {
  return async dispatch => {
    const users = await getUsers()
    dispatch({
      type: 'INIT_USERS',
      payload: users
    })
  }
}

export { initUsers }