import { useEffect, useState } from 'react';

const useAdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:4000/adminnotify/notifications'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error); 
      }
    };

    fetchNotifications();
  }, []);

  return notifications;
};

export default useAdminNotifications;
