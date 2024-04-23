const mongoose = require('mongoose');

const failnotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
});

const Notification = mongoose.model('AdminNotification', failnotificationSchema);

module.exports = Notification;
