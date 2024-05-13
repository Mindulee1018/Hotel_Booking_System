const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const stockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true,
    },
    quantity: {
      type: Number,
      required:true,
    },
    reorderLevel: {
      type: Number,
      required:true,
    },
    price: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
}

);
module.exports = mongoose.model('Stock', stockSchema)