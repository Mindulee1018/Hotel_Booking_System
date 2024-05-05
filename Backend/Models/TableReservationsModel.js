const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reservationSchema = new Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'table', 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String, 
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('TableReservation', reservationSchema);
