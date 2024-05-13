import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const useDeleteNotification = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const deleteNotification = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/notification/notification/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }else {
        navigate("/notifications");
        alert('Notification deleted successfully');
      }

      
      // Optionally, redirect or trigger a list refresh here...
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteNotification, isLoading, error, status };
};

export default useDeleteNotification;