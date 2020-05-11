import axios from 'axios'

const baseUrl = '/api/users'

const newAccountRequest = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password })
  return res.data
}

export { newAccountRequest }