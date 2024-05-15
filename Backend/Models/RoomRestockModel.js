const mongoose = require('mongoose');

const Schema = mongoose.Schema

const roomRestockSchema = new mongoose.Schema({
  Rid: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    itemName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
  }]
});


module.exports = mongoose.model('RoomRestock', roomRestockSchema)