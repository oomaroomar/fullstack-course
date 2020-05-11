import axios from 'axios'

const baseUrl = '/api/login'

const loginRequest = async (username, password) => {
  const res = await axios.post(baseUrl, { username, password })
  return res.data
}

export {loginRequest}