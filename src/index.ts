import axios from 'axios'
import { axiosConfig, apiParams } from './types/index'
export default class adAxios {
  instance: any
  constructor (options: axiosConfig) {
    const { baseUrl } = options
    this.create(options)
  }

  create (options: axiosConfig) {
    this.instance = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout
    })
  }
  handle (data, options) {

  }
  static getCookieData () {}
  getInstance (params: apiParams) {
    return params => {
      return this.instance({
        ...params
      })
    }
  }
}
