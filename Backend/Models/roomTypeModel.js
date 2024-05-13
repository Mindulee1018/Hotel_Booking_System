const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const roomSchema = new Schema({
  Rtype: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  NoOfBeds: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  NoofRooms: {
    type: Number,
    required: true,
  },

  RoomNumbers: {
    type: Array,
    required: true,
  },

  Image:imageSchema,

});

module.exports = mongoose.model('roomType', roomSchema)

