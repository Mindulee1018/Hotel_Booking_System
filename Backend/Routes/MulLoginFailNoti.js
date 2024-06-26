
const express = require('express');
const router = express.Router();
const {
  getUnreadNotifications,
  markNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotifications,
  getReadNotifications

} = require('../controllers/MultipleLoginController');

// Route to get unread notifications
router.get('/notifications', getUnreadNotifications);

//Route to get read notifications
router.get('/notifications/read', getReadNotifications);

// Route to mark notifications as read
router.post('/notifications/mark-read', markNotificationsAsRead);

// Route to Get the count of unread notifications
router.get('/notifications/count-unread', getUnreadNotificationCount); 

// Delete specific notifications
router.post('/notifications/delete', deleteNotifications); 

module.exports = router;
