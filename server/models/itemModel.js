const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema(
    {
        name: {type:String, required:true},
        time: { type: [String], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('item', ItemSchema)