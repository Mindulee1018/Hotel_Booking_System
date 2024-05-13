const mongoose = require('mongoose');

const Schema = mongoose.Schema

const roominventorySchema = new mongoose.Schema({
    itemID: {
        type:String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    reorderPoint:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('roominventory', roominventorySchema);