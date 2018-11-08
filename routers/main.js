/**
 * 根路径（/）下的路由
 */

const Router = require('koa-router')
const wx = require('../controllers/wx')

const router = Router({
  // prefix: '/'
})

router.get('/login', wx.wx_login)

module.exports = router