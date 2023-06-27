const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')

router.post('/', bookController.createBook)
router.get('/all', bookController.getBooksWithoutPagination)
router.get('/', bookController.findAllBook)
router.get('/:id', bookController.findBook)
router.put('/', bookController.updateBook)
router.delete('/', bookController.deleteBook)


module.exports = router