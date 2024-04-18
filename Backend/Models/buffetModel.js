const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    data: Buffer,
    contentType: String,
});

const buffetSchema = new Schema({

    BuffetName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },

    Image: imageSchema,
});

module.exports = mongoose.model("buffet", buffetSchema);

