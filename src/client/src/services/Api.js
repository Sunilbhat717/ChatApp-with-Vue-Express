import axios from 'axios'
import store from '../store/store'

export default () => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  return axios.create({
    baseURL: `http://localhost:3000/api/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
