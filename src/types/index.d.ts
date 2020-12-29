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
interface options {
  method: 'post' | 'get' | 'put' | 'delete',
  successTxt: string,
  failTxt: string,
  data: any,
  params: any
}

export {
  response,
  axiosConfig,
  options
}