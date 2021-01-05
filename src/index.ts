import axios from 'axios'
import { axiosConfig, options } from './types/index'
import { setHeaders, handleResponse, cancelToken } from './plugins/axios/axios.handleRequest'
let defaultOption: axiosConfig = {
  baseUrl: '',
  timeout: 0
}
export default class adAxios {
  instance: any
  pureInstance: any
  options: any
  constructor (options: axiosConfig = defaultOption) {
    this.options = options
    this.create(options)
  }

  create (options: axiosConfig) {
    this.instance = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout
    })
    this.pureInstance = axios
    setHeaders(this.pureInstance)
    setHeaders(this.instance)
    cancelToken(this.instance)
    handleResponse(this.instance)
  }
  static getCookieData () {}
  /**
   * @param url
   * @param params { axios 配置 比如请求方式 } 
   */
  getInstance (url: string, options: options) {
    return this.genPromise(this.instance, url, options)
  }
  getPureInstance (url: string, options: options) {
    return this.genPromise(this.pureInstance, url, options)
  }
  cancelFn () {}
  genPromise (instance, url, options) {
    return params => {
      if (options) {
        options.data = params || {}
        options.params = params || {}
      }
      if (options.hasOwnProperty('method')) options.method = 'post'
      return  new Promise ((resolve, reject) => {
        instance({
          baseURL: this.options.baseUrl,
          timeout: this.options.timeout,
          url,
          ...options
        }).then (res => {
          if (res.success && options.successTxt) {
            console.log(options.successTxt)
          }
          if (!res.success && options.failTxt) {
            if(options.failTxt) console.error(options.failTxt)
          }
          resolve(res)
        }).catch (err => {
          if(options.failTxt) console.trace(options.failTxt)
          reject(err)
        })
      })
    }
  }
}
