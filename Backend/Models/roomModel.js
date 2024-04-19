const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { Double } = require("mongodb");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const roomSchema = new Schema({


  Rid: {
    type: String,
    required: true,
  },

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

  status: {
    type: String,
    required: true
  },

  Image:imageSchema,

});

module.exports = mongoose.model('room', roomSchema)

