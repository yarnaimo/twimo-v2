import axios from 'axios'
import crypto from 'crypto'
import OAuth from 'oauth-1.0a'
import { Consumer, Token } from '../types'

export const configureUserContextAxios = (consumer: Consumer, token: Token) => {
  const oauth = new OAuth({
    consumer,
    signature_method: 'HMAC-SHA1',
    realm: '',
    hash_function: (baseString, key) =>
      crypto.createHmac('sha1', key).update(baseString).digest('base64'),
  })

  const userContextAxios = axios.create()

  userContextAxios.interceptors.request.use((config) => {
    const { Authorization } = oauth.toHeader(
      oauth.authorize(
        { url: config.url!, method: config.method!, data: config.data },
        token,
      ),
    )
    config.headers.Authorization = Authorization

    return config
  })

  return userContextAxios
}
