import axios from 'axios'
import handleError from './axios.handleError'
import { getCookieData } from '../../util/index'

let pendingPool = new Map()
export function mergeHeader (config, headerData = {}) {
  config.headers.common = Object.assign(config.headers.common, headerData)
  return config
}
export function setHeaders(instance: any) {
  instance.interceptors.request.use(config => {
    let { header } = getCookieData()
    config = mergeHeader(config, header)
    return config
  }, err => {
    return Promise.reject(err)
  })
}
export function cancelToken(instance: any) {
  instance.interceptors.request.use(config => {
    config.cancelToken = new axios.CancelToken(cancelFn => {
      pendingPool.has(config.url) ? cancelFn(`${config.url}请求重复`) : pendingPool.set(config.url, {
        cancelFn,
        global: config.global
      })
    })
    return config
  }, err => {
    return Promise.reject(err)
  })
}

export function handleResponse (instance) {
    instance.interceptors.response.use(res => {
      const { config } = res
      pendingPool.delete(config.url)
      return res
    }, err => {
        const { config } = err
        if (!err) return Promise.reject(err)
        if (err.response) {
            err = handleError(err)
        } else {
            // 没有response(没有状态码)的情况
            // eg: 超时；断网；请求重复被取消；主动取消请求；
            // 错误信息err传入isCancel方法，可以判断请求是否被取消
            if (axios.isCancel(err)) {
                throw new axios.Cancel(err.message || `请求'${config.url}'被取消`)
            } else if (err.stack && err.stack.includes('timeout')) {
                err.message = '请求超时!'
            } else {
                err.message = '连接服务器失败!'
            }
        }
    })
}