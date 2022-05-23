const HOST = location.hostname

let ENV_API_BASE_URL
let ENV_APP_BASE_URL
let ENV_BASE_COOKIE

if (HOST.includes('localhost')) {
  ENV_APP_BASE_URL = 'http://localhost:8080'
  ENV_API_BASE_URL = 'https://api.openai.com/v1/engines/'

  ENV_BASE_COOKIE = 'localhost'
} else if (HOST.includes('testing.funWithGPT.com')) {
  // testing property
} else {
  // production
}

export const APP_BASE_URL = ENV_APP_BASE_URL
export const API_BASE_URL = ENV_API_BASE_URL
export const BASE_COOKIE = ENV_BASE_COOKIE
