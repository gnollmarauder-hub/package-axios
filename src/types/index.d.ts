interface data {
  msg: string
  code: string
}

interface response {
  status: string | number
  data: data
}
interface axiosConfig {
  baseUrl: string
  timeout: number
}
interface apiParams {
  method: 'post' | 'get' | 'put' | 'delete',
  url: string,
  data: any
}

export {
  response,
  axiosConfig,
  apiParams
}