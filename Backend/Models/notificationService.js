const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  roomNumbers: {
    type: Array,
    required: true,
  },
});

const Hotel = mongoose.model("notification", notificationSchema);

module.exports = Hotel;
