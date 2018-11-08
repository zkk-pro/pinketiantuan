const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

const basename = path.basename(__filename)
console.log(basename)
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.js') !== 0 && (file !== basename) && file.endsWith('.js'))
  })
  .forEach(file => {
    console.log(`import controller from file ${file}...`)
    let route = require(path.join(__dirname, file))
    try{
      router.use('/api', route.routes(),route.allowedMethods())
    }catch(err) {
      console.error('err: %s', err.message)
    }
  })

module.exports = router