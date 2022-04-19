const express = require('express')

const ItemCtrl = require('../controllers/itemController')

const router = express.Router()

router.post('/item', ItemCtrl.createItem)
router.put('/items/:id', ItemCtrl.updateItem)
router.delete('/items/:id', ItemCtrl.deleteItem)
router.get('/items/:id', ItemCtrl.getItemById)
router.get('/items', ItemCtrl.getItems)


module.exports = router