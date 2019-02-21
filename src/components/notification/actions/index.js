/**
  *
  * ACTION
  *
  * Fluc d'information que l'ont veut envoyer
  * à notre State globale
  *
  */
import axios from 'axios'
import store from '../../../store'
import { apiPath } from '../../../utils/urlAPI'

/**
  * Disptach post register
  * @param {Object} comment
  */
const getCom = comsFromUser => ({
  type: 'GET_ALL_COMS_FROM_USER_TO_NOTIFY',
  comsFromUser
})

/**
  * Action de récupérer chaques post d'user connecté
  * @param {Object} id
  * @return {Object} Promise response
  */
export function getAllComFomUser(username) {
  return new Promise((resolve) => {
    axios.get(`${apiPath}/api/notifications/${username}`)
      .then((response) => {
        resolve(response.data.com)
        store.dispatch(getCom(response.data.com))
      })
  })
}
