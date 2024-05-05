const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tableSchema = new Schema ({
   tableNumber: {
      type: Number,
      required: true,
      
    },
    capacity: {
      type: Number,
      required: true,
    },
    
    status: {
      type: String,
      default: 'available', 
    },
});

module.exports = mongoose.model('table',tableSchema)

