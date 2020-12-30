// 处理响应错误码
import axios from 'axios'

import handleError from './axios.handleError'

export default (instance) => {
    instance.interceptors.response.use(res => {
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