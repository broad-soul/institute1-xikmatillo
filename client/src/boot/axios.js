import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 10000
})
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
