import crypto from 'crypto'

import axios from 'axios'
import OAuth from 'oauth-1.0a'

import { Consumer, Token } from '../types/index.js'

export const configureApiAxios = () => {
  const apiAxios = axios.create()

  apiAxios.defaults.validateStatus = (status) => {
    return (200 <= status && status < 300) || (400 <= status && status < 500)
  }

  return apiAxios
}

export const configureUserContextApiAxios = (
  consumer: Consumer,
  token: Token,
) => {
  const oauth = new OAuth({
    consumer,
    signature_method: 'HMAC-SHA1',
    realm: '',
    hash_function: (baseString, key) =>
      crypto.createHmac('sha1', key).update(baseString).digest('base64'),
  })

  const userContextApiAxios = configureApiAxios()

  userContextApiAxios.interceptors.request.use((config) => {
    const { Authorization } = oauth.toHeader(
      oauth.authorize(
        { url: config.url!, method: config.method!, data: config.data },
        token,
      ),
    )
    config.headers ??= {}
    config.headers['Authorization'] = Authorization

    return config
  })

  return userContextApiAxios
}
