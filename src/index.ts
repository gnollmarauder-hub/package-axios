import axios from 'axios'
import { axiosConfig, options } from './types/index'
export default class adAxios {
  instance: any
  constructor (options: axiosConfig) {
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
}
