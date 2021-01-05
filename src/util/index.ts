import Cookies from 'js-cookie'

// const HEADER_DATA = getRequestHeader()
const COOKIE_DATA = {
  user: getUserInfo(),
  header: getRequestHeader()
}

export function getRequestHeader () {
  return {
    Authorization: Cookies.get('BEARER_TOKEN'),
    'W-FLOW': Cookies.get('W-FLOW') || 'default',
    'W-SEQ': Cookies.get('W-SEQ') || '1569595974015_2',
    'W-EVENT': Cookies.get('W-EVENT') || null,
    ip: Cookies.get('ip') || 'http://127.0.0.1'
  }
}

/**
 * 获取cookie 中 userInfo 信息
 */
export function getUserInfo () {
  let userInfo = Cookies.get('userInfo')
  try {
    userInfo = userInfo ? JSON.parse(userInfo) : null
  } catch (e) {
    userInfo = null
    console.log(e)
  }
  return userInfo
}

// 获取cookie 数据
export function getCookieData () {
  return COOKIE_DATA
}