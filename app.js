const Koa = require('koa')
const router = require('./routers')



const app = new Koa()

// 路由
app.use(router.routes(),router.allowedMethods())





app.listen(3000, () => {
  // logger.debug("Time:", new Date())
  console.log('server runing at http://localhost:3000')
})