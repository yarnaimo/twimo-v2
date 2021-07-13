import { Class } from 'type-fest'
import { Configuration, ConfigurationParameters } from '../../openapi'
import { BaseAPI } from '../../openapi/base'
import { Consumer, Token } from '../types'
import { configureUserContextAxios } from './_axios'

export const configureTwitterApi = <T extends BaseAPI>(
  ApiInterface: Class<T>,
  bearerToken: string,
  configParams: ConfigurationParameters = {},
) => {
  const config = new Configuration({
    ...configParams,
    accessToken: bearerToken,
  })
  const api = new ApiInterface(config)
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
  const axios = configureUserContextAxios(consumer, token)
  const api = new ApiInterface(config, undefined, axios)
  return api
}
