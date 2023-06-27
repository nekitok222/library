const Router = require('express')
const router = new Router()
const authorRouter = require('./authorRouter')
const bookRouter = require('./bookRouter')

router.use('/author', authorRouter)
router.use('/book', bookRouter)

module.exports = router
