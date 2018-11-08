const Koa = require('koa')
const debug = require('debug')
const rp = require('request-promise')
const jwt = require('jsonwebtoken')
const wx = require('./config/wxconfig')

const app = new Koa()

app.use(async ctx => {
  // 获取openid和session_key
  let options = {
    // uri: `https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appid}&secret=${wx.secret}&js_code=${ctx.query.code}&grant_type=authorization_code`,
    uri: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      appid: wx.appid,
      secret: wx.secret,
      js_code: ctx.query.code,
      grant_type: 'authorization_code'
    }
  }
  const data = await rp(options)
  console.log(data)
  const token = jwt.sign({
    code: ctx.query.code
  }, data.openid, {
    expiresIn: 10000 // 100秒到期
  })
  console.log(token)
  console.log(ctx.query)
  ctx.body = data
})



app.listen(3000, () => {
  console.log('server runing at http://localhost:3000')
})