
const Notification = require('../Models/MultipleLoginFailModel');

// Get unread notifications
const getUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ status: 'unread' }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

// Mark notifications as read
const markNotificationsAsRead = async (req, res) => {
  const { notificationIds } = req.body;

  try {
    await Notification.updateMany({ _id: { $in: notificationIds } }, { status: 'read' });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error marking notifications as read' });
  }
};

// Get the count of unread notifications
const getUnreadNotificationCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ status: 'unread' });
    res.json({ count: unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get unread notification count' });
  }
};

// Delete notifications by their IDs
const deleteNotifications = async (req, res) => {
  try {
    const { notificationIds } = req.body;
    await Notification.deleteMany({ _id: { $in: notificationIds } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notifications' });
  }
};

module.exports = {
  getUnreadNotifications,
  markNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotifications

};
