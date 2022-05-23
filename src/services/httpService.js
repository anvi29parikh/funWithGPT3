import axios from 'axios'

export const request = (options) => {
  const config = {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    url: options.url,
    method: options.method,
    data: options.body
  }

  config.headers.Authorization = 'Bearer ' + 'YOUR-API-SECRET'

  if (navigator.onLine) {
    return axios.request(config).then(response => {
      return response
    }).catch((error) => {
      throw error
    })
  } else {
    return {
      message: 'INTERNET DISCONNECTED'
    }
  }
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}
