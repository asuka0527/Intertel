const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const dispositionSchema = require('./dispositionModel')

const Item = require('../models/itemModel');

const OrderSchema = new Schema(
    {
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: false },
        customerAddress: { type: String, required: false },
        agentName: { type: String, required: true },
        agentPhone: { type: String, required: false },
        agentAddress: { type: String, required: false },
        quantity: {   type: Number,required: true,default: 0},
        modelName: { type: String, required: true },
        serialNumber: { type: String, required: true },
        mac1: { type: String, required: false },
        mac2: { type: String, required: false },
        boxNo: { type: String, required: false },
        sealNo: { type: String, required: false },
        soldAt: { type: Date },
        invoiceAt: { type: Date },
        shippedAt: { type: Date },
        returnedAt: { type: Date },
        note: { type: String, required: false },
        dispositions: [{type: mongoose.Schema.Types.ObjectId, ref:'disposition'}],
        time: { type: [String], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('order', OrderSchema)