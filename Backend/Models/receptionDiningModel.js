const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableSchema = new Schema({
  Date: {
    type: String,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Capacity: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  contactNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("tables", tableSchema);
