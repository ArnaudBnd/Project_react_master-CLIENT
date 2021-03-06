import axios from 'axios'

/**
  * setAuthorizationTOken
  * @param {Object} token
  */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}
