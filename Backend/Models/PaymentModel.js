const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentSchema = new Schema(
{
    c_name:{
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    card_number:{
        type: Number,
        required: true,
    },
    cvc:{
        type: Number,
        
    },
    card_expiration:{
        type: String,
        required: true,
    },
    
}, {
    timestamps: true
});



module.exports = mongoose.model("Payment", paymentSchema);