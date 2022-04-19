const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const autoIncrement = require('mongoose-sequence')(mongoose);

const DispositionSchema = new Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"order"
        },
        shippedAt: Date,
        shippedFrom: {type:String, required:false},
        note: {type:String, required:false},
        isDeleted: {type:Boolean, default:false},
        time: { type: [String], required: true }
    },
    { timestamps: true },
)

// Disposition.plugin(autoIncrement);

module.exports = mongoose.model('disposition', DispositionSchema)