const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { Double } = require("mongodb");

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  CusName: {
    type: String,
    required: true,
  },
  TelNo: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  checkinDate: {
    type: String,
    required: true,
  },
  checkinTime: {
    type: String,
    required: true,
  },
  activityList: {
    type: Array,
    required: true,
  },
  checkout: { // Adding this new field
    type: Boolean,
    required: true,
    default: false // Set default value to false
  }
});

module.exports = mongoose.model("WatersportReservation", ReservationSchema);
