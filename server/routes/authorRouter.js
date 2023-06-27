const Router = require('express')
const router = new Router()
const authorController = require('../controllers/authorController')

router.post('/', authorController.createAuthor)
router.get('/all', authorController.findAllWithoutPagination)
router.get('/', authorController.findAllAuthors)
router.get('/:id', authorController.findAuthor)
router.put('/', authorController.updateAuthor)
router.delete('/', authorController.deleteAuthor)

module.exports = router