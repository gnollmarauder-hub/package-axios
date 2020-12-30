import { getCookieData } from '../../util/index'

export function mergeHeader (config, headerData = {}) {
  config.headers.common = Object.assign(config.headers.common, headerData)
  return config
}
export function setHeaders(instance: any) {
  instance.interceptors.request.use(config => {
    let { header } = getCookieData()
    config = mergeHeader(config, header)
    return config
  })
}