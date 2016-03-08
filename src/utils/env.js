
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 压测
const PRESSURE = 3
// 预生产
const PREPRODUCTION = 4
// 生产
const PRODUCTION = 5
// 亚马逊
const AWS = 6

export const LOC_PROTOCOL = location.protocol
export const LOC_HOST = location.host
// host === hostname:port
export const LOC_HOSTNAME = location.hostname
export const LOC_PORT = location.port
export const LOC_ORIGIN = `${LOC_PROTOCOL}//${LOC_HOST}`

/**
 * @constant {string} ENV
 */
const ENV = (function () {
  switch (LOC_HOSTNAME) {
    case '127.0.0.1':
    case 'localhost':
      return DEVELOPMENT
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE
      }
      if (/\.beta\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      if (/\.aws\.101\.com/.test(LOC_HOSTNAME)) {
        return AWS
      }
      return PRODUCTION
  }
})()

/**
 * 帐号中心
 * @constant {string} UC
 */
export const UC = (function () {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return 'https://ucbetapi.101.com'
    case PRODUCTION:
      return 'https://aqapi.101.com'
    case AWS:
      return 'https://awsuc.101.com'
    default:
      return LOC_ORIGIN
  }
})()

/**
 * 内容服务
 * @constant {string} CS
 */
export const CS = (function () {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return 'http://betacs.101.com'
    case PRODUCTION:
      return 'http://cs.101.com'
    case AWS:
      return 'https://awscs.101.com'
    default:
      return LOC_ORIGIN
  }
})()

/*
 * @constant {string} AVATAR_URL 用户头像
 */
export const AVATAR_URL = (function () {
  switch (ENV) {
    // 生产
    case PRODUCTION:
      return `${CS}/v0.1/static/cscommon/avatar`
    default:
      return `${CS}/v0.1/static/preproduction_content_cscommon/avatar`
  }
})()
