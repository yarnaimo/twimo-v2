import { Class } from 'type-fest'

import { BaseAPI } from '../../openapi/base.js'
import { Configuration, ConfigurationParameters } from '../../openapi/index.js'
import { Consumer, Token } from '../types/index.js'
import { configureApiAxios, configureUserContextApiAxios } from './_axios.js'

export const configureTwitterApi = <T extends BaseAPI>(
  ApiInterface: Class<T>,
  bearerToken: string,
  configParams: ConfigurationParameters = {},
) => {
  const config = new Configuration({
    ...configParams,
    accessToken: bearerToken,
  })
  const axios = configureApiAxios()
  const api = new ApiInterface(config, undefined, axios)
  return api
}

export const configureUserContextTwitterApi = <T extends BaseAPI>(
  ApiInterface: Class<T>,
  consumer: Consumer,
  token: Token,
  configParams: ConfigurationParameters = {},
) => {
  const config = new Configuration({
    ...configParams,
  })
  const axios = configureUserContextApiAxios(consumer, token)
  const api = new ApiInterface(config, undefined, axios)
  return api
}
