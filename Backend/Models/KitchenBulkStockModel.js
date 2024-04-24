const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const bulkStockSchema = new Schema(
  {
    bname: {
      type: String,
      required: true,
    },
    bcategory: {
      type: String,
      required:true,
    },
    bquantity: {
      type: Number,
      required:true,
    },
    breorderLevel: {
      type: Number,
      required:true,
    },
    bunits: {
        type: Number,
        required:true,
    },
    bprice: {
      type: Number,
      required: true,
    },
    bdescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
}

);
module.exports = mongoose.model('BulkStock', bulkStockSchema)