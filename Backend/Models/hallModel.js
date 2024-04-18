
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const hallSchema = new Schema({

    Name:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require:true
    },
    capacity:{
        type:Number,
        require:true
    },
    price: {
      type: String,
      require:true
    },
    photos: [],
    facilities:[],

    hallNumber:[{
        Roomnumber:Number,unavailableDates:{Type:[Date]} }]
  

})
module.exports = mongoose.model('Hall', hallSchema)
