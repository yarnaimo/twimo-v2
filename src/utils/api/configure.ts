import { Class } from 'type-fest'
import { Configuration, ConfigurationParameters } from '../../../openapi'
import { BaseAPI } from '../../../openapi/base'
import { AccessTokens, ApiKeys } from '../../types'
import { configureUserContextAxios } from './_axios'

export const configureApi = <T extends BaseAPI>(
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

export const configureUserContextApi = <T extends BaseAPI>(
  ApiInterface: Class<T>,
  apiKeys: ApiKeys,
  accessTokens: AccessTokens,
  configParams: ConfigurationParameters = {},
) => {
  const config = new Configuration({
    ...configParams,
  })
  const axios = configureUserContextAxios(apiKeys, accessTokens)
  const api = new ApiInterface(config, undefined, axios)
  return api
}
