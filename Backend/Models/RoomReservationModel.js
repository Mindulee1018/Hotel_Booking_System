const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const roomreservationSchema = new Schema({

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

    Rid:{
        type:String,
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

    RoomResvID:{
        type:String,
        require:true
    },

    price:{
        type:Number,
        require:true
    }





    
})



module.exports = mongoose.model('roomreservation',roomreservationSchema); //create collection

