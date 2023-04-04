import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createUser = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUser
}