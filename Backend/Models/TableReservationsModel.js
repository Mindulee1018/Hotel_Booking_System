const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reservationSchema = new Schema({

  tableReservationNo: {
    type: String, 
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

  Noofguests: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('TableReservation', reservationSchema);
