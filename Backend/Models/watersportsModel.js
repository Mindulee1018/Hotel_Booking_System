const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { Double } = require("mongodb");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const watersportsSchema = new Schema({
  Activity: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },

  qtyPerRound: {
    type: Number,
    required: true,
  },

  Image: imageSchema,
});

module.exports = mongoose.model("Watersport", watersportsSchema);
