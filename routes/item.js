const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/ItemController')
const authenticate = require('../middleware/authenticate')
router.get('/',authenticate,ItemController.index)
router.get('/all',authenticate,ItemController.indexPagination)
router.get('/show/:id',authenticate, ItemController.show)
router.post('/store',authenticate,ItemController.store)
router.post('/update/:id',authenticate,ItemController.update)
router.post('/delete',authenticate,ItemController.destroy)
router.post('/search',authenticate,ItemController.search)


//
router.get('/status',authenticate,)
module.exports = router