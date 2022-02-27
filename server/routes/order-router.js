const express = require('express')

const OrderCtrl = require('../controllers/order-ctrl')

const router = express.Router()

// router.post('/order', OrderCtrl.createOrder)
// router.put('/orders/:id', OrderCtrl.updateOrder)
// router.delete('/orders/:id', OrderCtrl.deleteOrder)
// router.get('/orders/:id', OrderCtrl.getOrderById)
router.get('/orders', OrderCtrl.getOrders)


module.exports = router