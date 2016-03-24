'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// 开发
var DEVELOPMENT = 1;
// 测试
var DEBUG = 2;
// 压测
var PRESSURE = 3;
// 预生产
var PREPRODUCTION = 4;
// 生产
var PRODUCTION = 5;
// 亚马逊
var AWS = 6;

var LOC_PROTOCOL = exports.LOC_PROTOCOL = location.protocol;
var LOC_HOST = exports.LOC_HOST = location.host;
// host === hostname:port
var LOC_HOSTNAME = exports.LOC_HOSTNAME = location.hostname;
var LOC_PORT = exports.LOC_PORT = location.port;
var LOC_ORIGIN = exports.LOC_ORIGIN = LOC_PROTOCOL + '//' + LOC_HOST;

/**
 * @constant {string} ENV
 */
var ENV = function () {
  switch (LOC_HOSTNAME) {
    case '127.0.0.1':
    case 'localhost':
      return DEVELOPMENT;
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT;
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG;
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE;
      }
      if (/\.beta\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION;
      }
      if (/\.aws\.101\.com/.test(LOC_HOSTNAME)) {
        return AWS;
      }
      return PRODUCTION;
  }
}();

/**
 * 帐号中心
 * @constant {string} UC
 */
var UC = exports.UC = function () {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return 'https://ucbetapi.101.com';
    case PRODUCTION:
      return 'https://aqapi.101.com';
    case AWS:
      return 'https://awsuc.101.com';
    default:
      return LOC_ORIGIN;
  }
}();

/**
 * 内容服务
 * @constant {string} CS
 */
var CS = exports.CS = function () {
  switch (ENV) {
    case DEVELOPMENT:
    case DEBUG:
    case PREPRODUCTION:
    case PRESSURE:
      return 'http://betacs.101.com';
    case PRODUCTION:
      return 'http://cs.101.com';
    case AWS:
      return 'https://awscs.101.com';
    default:
      return LOC_ORIGIN;
  }
}();

/*
 * @constant {string} AVATAR_URL 用户头像
 */
var AVATAR_URL = exports.AVATAR_URL = function () {
  switch (ENV) {
    // 生产
    case PRODUCTION:
      return CS + '/v0.1/static/cscommon/avatar';
    default:
      return CS + '/v0.1/static/preproduction_content_cscommon/avatar';
  }
}();