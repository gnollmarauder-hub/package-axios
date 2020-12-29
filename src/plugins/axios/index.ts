import axios from 'axios'
import handleResponse from './axios.handleResponse'
import handleError from './axios.handleError'

const showTip = (tip)=>{
  console.log({
    type: 'warning',
    message: tip || '请求出错啦',
    duration: 1500
  })
}

let pendingPool = new Map()

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么，例如把用户的登录信息放在请求头上
    // config.headers.common['cookie-id'] = cookieId
    // 对于异常的响应也需要在pendingPool中将其删除，但响应拦截器中的异常响应有些获取不到请求信息，这里将其保存在实例上
    config = Object.assign({}, config)
    config.cancelToken = new axios.CancelToken((cancelFn) => {
      pendingPool.has(config.url) ? cancelFn(`${config.url}请求重复`) : pendingPool.set(config.url, { cancelFn, global: config.global })
    })
    return config
  },
  (err) => {
    // 对请求错误做些什么
    Promise.reject(err)
  }
)
/**
 * 响应拦截
 */
axios.interceptors.response.use(
    (response: any):any => {
      showTip(response.message)
      return Promise.resolve(handleResponse(response))
    },
    // 对异常响应处理
    (err) => {
        if (!err) return Promise.reject(err)

        if (err.response) {
            err = handleError(err)
        }
        // 没有response(没有状态码)的情况
        // eg: 超时；断网；请求重复被取消；主动取消请求；
        else {
            // 错误信息err传入isCancel方法，可以判断请求是否被取消
            if (axios.isCancel(err)) {
                throw new axios.Cancel(err.message || `请求'${err.config.url}'被取消`)
            } else if (err.stack && err.stack.includes('timeout')) {
                err.message = '请求超时!'
            } else {
                err.message = '连接服务器失败!'
            }
        }
        showTip(err.message)
        return Promise.reject(err)
    }
)