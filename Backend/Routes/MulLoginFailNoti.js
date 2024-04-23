
const express = require('express');
const router = express.Router();
const {
  getUnreadNotifications,
  markNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotifications

} = require('../controllers/MultipleLoginController');

// Route to get unread notifications
router.get('/notifications', getUnreadNotifications);

// Route to mark notifications as read
router.post('/notifications/mark-read', markNotificationsAsRead);

// Route to Get the count of unread notifications
router.get('/notifications/count-unread', getUnreadNotificationCount); 

// Delete specific notifications
router.post('/notifications/delete', deleteNotifications); 

module.exports = router;
