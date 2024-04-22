const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
   orderNumber: {
      type: String,
      required: true
   },

   productName: {
      type: String,
      required: true
   },
   Quantity: {
      type: Number,
      required: true
   },
   Price: {
      type: Number,
      required: true
   },

   cusName: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true,
      unique: true
   },

   contactNumber: {
      type: Number,
      required: true
   },

   Total:{
      type:Number,
      required:true
   }

});

module.exports = mongoose.model('order', orderSchema)

