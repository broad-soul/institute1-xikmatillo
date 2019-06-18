import axios from 'axios'
import saveAs from 'file-saver'

export function openUrl (context, val) {
  window.open(val)
}

export function changeLang (context, val) {
  localStorage.setItem('local_lang', val)
  context.commit('CHANGE_LANG', val)
}

export function isAuthorized (context) {
  axios.defaults.headers.Authorization = 'Bearer ' + context.getters.getToken
  return axios.get('api/user')
}

export function login (context, val) {
  return axios.post('api/login', val)
    .then(response => {
      let res = response.data
      let token = res.token
      localStorage.setItem('access_token', token)
      context.commit('LOGIN', res)
      return token
    })
}

export function downloadFile (context, val) {
  return axios.post('api/download_file', { file_name: val }, { responseType: 'arraybuffer' })
    .then(response => {
      let blob = new Blob([response.data])
      saveAs(blob, val)
    })
}

export async function calcSize (context, size) {
  size = size / 1024 // kb
  if (size <= 1000) {
    return Math.round(size) + 'Kb'
  } else if (size > 1000 && size <= 1048506) {
    return (size / 1024).toFixed(2) + 'Mb'
  } else {
    return (size / 1024 / 1000).toFixed(2) + 'Gb'
  }
}

export async function recaptchaToken () {
  return new Promise((resolve) => {
    window.grecaptcha.ready(async () => {
      const token = await window.grecaptcha.execute('6LeN96cUAAAAALd_TFioxHn86cOe0At0Na9h8KyX')
      resolve(token)
    })
  })
}

export async function mainGetData (context) {
  let res = await axios.post('/api/main_get')
  context.commit('SET_MAIN_DATA', res.data)
  return context.getters.getMainData
}
export async function refreshScrollIntIndex (context) {
}
