const dispositionModel = require('../models/dispositionModel')
const Order = require('../models/orderModel')
const Disposition = require('../models/dispositionModel')
const asyncHandler = require('express-async-handler')

// @description    Create new order
// @route          POST/api/order
// @access         Private
createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

// @description     Update order
// @route           GET/api/orders/:id
// @access          Private
updateOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'order not found!',
            })
        }
        order.name = body.name
        order.time = body.time
        order.rating = body.rating
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Order not updated!',
                })
            })
    })
}

// @description     Delete order
// @route           GET/api/orders/:id
// @access          Private
deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

// @description    Get order by ID
// @route          GET/api/orders/:id
// @access         Private
getOrderById = async (req, res) => {
    
    const order = await Order.findOne({ _id: req.params.id }).populate("dispositions");

    console.log(order.disposition);

    if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
}

// @description    Get all orders
// @route          GET/api/orders
// @access         Private
getOrders = async (req, res) => {
    await Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `Orders not found` })
        }
        return res.status(200).json({ success: true, data: orders })
    }).populate("dispositions").catch(err => console.log(err))
}

// @description    Add disposition to order
// @route          POST/api/orders/:id/disposition
// @access         Private
addDisposition = asyncHandler(async (req, res) => {

    const {
        note,
        shippedAt,
        shippedFrom,
        
    } = req.body

    const foundOrder = await Order.findById(req.params.id);
    
    if(foundOrder){
        const disposition = new Disposition({
            order : foundOrder._id,
            note: note,
            shippedAt: shippedAt,
            shippedFrom: shippedFrom,
        })

        foundOrder.dispositions.push(disposition);

        await disposition.save();
        await foundOrder.save();

        res.status(201).json({ success: true, data: foundOrder })
        
    }else {
        res.status(404).json({ success: false, message: "Failed to add Disposition",data: foundOrder })
    }
})

// @description    Delete disposition to order
// @route          DELETE/api/orders/:id/disposition/:dispositionId
// @access         Private
removeDisposition = asyncHandler(async (req, res) => {
const {id, dispositionId} = req.params;

await Order.findByIdAndUpdate(id, {$pull:{dispositions: dispositionId}})

await Disposition.findByIdAndDelete(dispositionId)
res.status(201).json({ success: true, message: "Deleted disposition" })

})

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
    addDisposition,
    removeDisposition
}