
const express = require('express');
const router = express.Router();
const {
  getUnreadNotifications,
  markNotificationsAsRead,
} = require('../controllers/MultipleLoginController');

// Route to get unread notifications
router.get('/notifications', getUnreadNotifications);

// Route to mark notifications as read
router.post('/notifications/mark-read', markNotificationsAsRead);

module.exports = router;
