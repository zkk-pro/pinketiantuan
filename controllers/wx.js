const rp = require('request-promise')
const jwt = require('jsonwebtoken')
const wxconfig = require('../config/wxconfig')
const rs = require('../lib/response')


module.exports = {
  // 微信登录 获取openid和session_key
  async wx_login(ctx) {
    let options = {
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      json: true,
      qs: {
        appid: wxconfig.appid,
        secret: wxconfig.secret,
        js_code: ctx.query.code,
        grant_type: 'authorization_code'
      }
    }
    const data = await rp(options)
    // 判读请求是否有错
    if(data.errcode) {
      return ctx.body = rs({msg: '服务器内部错误'})
    }
    // 生成token
    const token = jwt.sign({
      code: ctx.query.code
    }, data.openid, {
      expiresIn: 10000 // 100秒到期
    })
    ctx.body = rs({code: 1000, msg: 'ok', data: {token}})
  }
}