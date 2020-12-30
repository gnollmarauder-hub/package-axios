import axios from 'axios'
import setConfig from './axios.setConfig.js'

/**
 * intactRequest是只在axios基础上更改了请求配置。
 * 而request是基于axios创建的实例，实例只有常见的数据请求方法，没有axios.isCancel/ axios.CancelToken等方法，
 * 也就是没有**取消请求**和**批量请求**的方法。
 * 所以如果需要在实例中调用取消某个请求的方法（例如取消上传），请用intactRequest。
 */
let intactRequest = setConfig(axios)
let request = setConfig(intactRequest.create())

// 请求中的api
let pendingPool = new Map()

/**
 * 请求拦截
 */
request.interceptors.request.use(
    //...
)
/**
 * 响应拦截
 */
request.interceptors.response.use(
    // ...
)

export { intactRequest, request }