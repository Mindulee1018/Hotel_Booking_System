const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const roomreservationSchema = new Schema({

    roomreservationID:{
        type:String,
        require:true
    },

    Checkindate:{
        type:Date,
        require:true
    },

    Checkoutdate: {
      type:Date,
      require:true
    },

    NoOfGuests:{
        type:Number,
        require:true
    },

    Rtype:{
        type:String,
        require:true
    },

    noofRooms:{
        type:Number,
        require:true
    },

    RoomNumbers:{
        type: Array,
        require:true
    },

    firstName:{
        type:String,
        require:true
    },

    lastName:{
        type:String,
        require:true
    },

    Email:{
        type:String,
        require:true
    },

    Address:{
        type:String,
        require:true
    },

    phoneno:{
        type:Number,
        require:true
    },

    TotalPrice:{
        type:Number,
        require:true
    },

    checkout: { // Adding this new field
        type: Boolean,
        required: true,
        default: false // Set default value to false
      }

    
})



module.exports = mongoose.model('roomreservation',roomreservationSchema); //create collection

