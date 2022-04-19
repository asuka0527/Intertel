const express = require('express')

const OrderCtrl = require('../controllers/orderController')

const router = express.Router()

router.post('/order', OrderCtrl.createOrder)
router.put('/orders/:id', OrderCtrl.updateOrder)
router.delete('/orders/:id', OrderCtrl.deleteOrder)
router.get('/orders/:id', OrderCtrl.getOrderById)
router.get('/orders', OrderCtrl.getOrders)
router.post('/orders/:id/disposition', OrderCtrl.addDisposition)
router.delete('/orders/:id/disposition/:dispositionId', OrderCtrl.removeDisposition)



module.exports = router