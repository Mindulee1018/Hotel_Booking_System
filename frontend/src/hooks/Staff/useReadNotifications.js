
import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [Notifications, setNotifications] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        
        const Response = await fetch('http://localhost:4000/notification/');
        if (!Response.ok) {
          throw new Error('Failed to fetch Activity list');
        }
        const Data = await Response.json();
        console.log(Response,"Response")
        setNotifications(Data);
        console.log(Data,"Data")

 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { Notifications, isLoading, error };
};

export default useNotifications;