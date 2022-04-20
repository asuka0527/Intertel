const dispositionModel = require('../models/dispositionModel')
const Order = require('../models/orderModel')
const Disposition = require('../models/dispositionModel')
const asyncHandler = require('express-async-handler')

// @description    Create new order
// @route          POST/api/order
// @access         Private
createOrder = asyncHandler(async(req, res) => {
    const body = req.body

    if (!body.customerName) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a Customer Name',
        })
    }

    const order = await Order.create({
        customerName  :body.customerName,
        customerPhone : body.customerPhone,
        customerAddress : body.customerAddress,
        agentName : body.agentName,
        agentPhone : body.agentPhone,
        agentAddress : body.agentAddress,
        quantity : body.quantity,
        modelName : body.modelName,
        serialNumber : body.serialNumber,
        mac1 : body.mac1,
        mac2 : body.mac2,
        boxNo : body.boxNo,
        sealNo : body.sealNo,
        soldAt : body.soldAt,
        invoiceAt : body.invoiceAt,
        shippedAt : body.shippedAt,
        returnedAt : body.returnedAt,
        note : body.note
      })

      res.status(200).json(order)
})

// @description     Update order
// @route           GET/api/orders/:id
// @access          Private
updateOrder = asyncHandler(async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

  const order = await Order.findById(req.params.id);

   //if the order found update these properties
   if (order) {
       
    order.customerName = body.customerName
    order.customerPhone = body.customerPhone
    order.customerAddress = body.customerAddress
    order.agentName = body.agentName
    order.agentPhone = body.agentPhone
    order.agentAddress = body.agentAddress
    order.quantity = body.quantity
    order.modelName = body.modelName
    order.serialNumber = body.serialNumber
    order.mac1 = body.mac1
    order.mac2 = body.mac2
    order.boxNo = body.boxNo
    order.sealNo = body.sealNo
    order.soldAt = body.soldAt
    order.invoiceAt = body.invoiceAt
    order.shippedAt = body.shippedAt
    order.returnedAt = body.returnedAt
    order.note = body.note

    // save the updated order to db return it to the body
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }

})

// @description     Delete order
// @route           GET/api/orders/:id
// @access          Private
deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      await order.remove();
      res.json({ message: "Order removed" });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  });
  


// @description    Get order by ID
// @route          GET/api/orders/:id
// @access         Private
getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findOne({ _id: req.params.id }).populate("dispositions");

    if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
})

// @description    Get all orders
// @route          GET/api/orders
// @access         Private
getOrders = asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          customerName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

  const count = await Order.countDocuments({ ...keyword });

  const orders = await Order.find({ ...keyword })
  .populate("dispositions")
  .limit(pageSize)
  .skip(pageSize * (page - 1));

  if(orders.length > 0){
      
      res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    }
    else {
        res.status(404)
    }
})

// @description    Add disposition to order
// @route          POST/api/orders/:id/disposition
// @access         Private
addDisposition = asyncHandler(async (req, res) => {

    const {
        note,
        shippedAt,
        shippedFrom,
        
    } = req.body

    const foundOrder = await Order.findById(req.params.id).populate("dispositions");
    
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

// @description    Update disposition in order
// @route          PUT/api/orders/:id/disposition/:dispositionId
// @access         Private

updateDisposition = asyncHandler (async(req,res) => {
    const {id, dispositionId } = req.params;

    // await Disposition.findByIdAndUpdate(id, )
})

// @description    Delete disposition from order
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
    updateDisposition,
    removeDisposition
}