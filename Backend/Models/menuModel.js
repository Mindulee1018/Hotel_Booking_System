const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const menuSchema = new Schema({

   category:{
      type:String,
      required:true
   },
   productName:{
      type:String,
      required:true
   },
  
   Price:{
      type: Number,
      required:true
   },
  
  Image: imageSchema,
});

module.exports = mongoose.model("menu",menuSchema);

