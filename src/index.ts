import axios from 'axios'
import { axiosConfig, options } from './types/index'
import { setHeaders } from './plugins/axios/axios.handleRequest'
import handleResponse from './plugins/axios/axios.handleResponse'
export default class adAxios {
  instance: any
  pureInstance: any
  constructor (options: axiosConfig) {
    this.create(options)
  }

  create (options: axiosConfig) {
    this.instance = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout
    })
    setHeaders(this.instance)
    handleResponse(this.instance)
  }
  static getCookieData () {}
  /**
   * @param url
   * @param params { axios 配置 比如请求方式 } 
   */
  getInstance (url: string, options: options) {
    return params => {
      if (options) {
        options.data = params
        options.params = params
      }
      return  new Promise ((resolve, reject) => {
        this.instance({
          url,
          ...options
        }).then (res => {
          if (res.success && options.successTxt) {
            console.log(options.successTxt)
          } else {
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
  getPureInstance () {
    
  }
}
