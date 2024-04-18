const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const hotelSchema = new Schema({
    name: { 
        type: String,
         required: true 
    },
    address: {
         type: String,
          required: true 
    },
    Aboutus: {
         type: String, 
         required: true 
    },
    email: {
        type: String, 
        required: true 
    },
    phoneno: {
     type: String, 
     required: true 
    },
    

  });
  
  // Create hotel model
  const Hotel = mongoose.model('HotelDetails', hotelSchema);
  
  module.exports = Hotel;