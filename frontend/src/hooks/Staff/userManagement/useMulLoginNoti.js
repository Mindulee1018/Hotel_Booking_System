import { useState, useEffect } from 'react';

// Custom hook for managing notifications
const useNotificationManager = (baseUrl) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readNotifications, setReadNotifications] = useState([]);

  // Function to fetch unread notifications
  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:4000/adminnotify/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        updateUnreadCount();
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error(error);
    }
  };

    // Function to fetch read notifications
  const fetchReadNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:4000/adminnotify/notifications/read`);
      if (response.ok) {
        const data = await response.json();
        setReadNotifications(data);
      } else {
        throw new Error('Failed to fetch read notifications');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update the count of unread notifications
  const updateUnreadCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/adminnotify/notifications/count-unread`);
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      } else {
        throw new Error('Failed to fetch unread count');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to mark notifications as read
  const markNotificationsAsRead = async (notificationIds) => {
    try {
      const response = await fetch(`http://localhost:4000/adminnotify/notifications/mark-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      if (response.ok) {
        await fetchUnreadNotifications();
        updateUnreadCount(); // Update the count of unread notifications
      } else {
        throw new Error('Failed to mark notifications as read');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete notifications by their IDs
  const deleteNotifications = async (notificationIds) => {
    try {
      const response = await fetch(`http://localhost:4000/adminnotify/notifications/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      if (response.ok) {
        await fetchUnreadNotifications();
        updateUnreadCount(); // Ensure count is updated after deletion
      } else {
        throw new Error('Failed to delete notifications');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    markNotificationsAsRead,
    deleteNotifications,
    readNotifications
  };
};

export default useNotificationManager;
