import { request } from '../services/httpService'
import { API_BASE_URL } from '../constants/index'

const URL = '/completions'

export async function createCompletion (engine, queryData) {
  return request({
    url: API_BASE_URL + engine + URL,
    method: 'post',
    body: queryData
  })
}
