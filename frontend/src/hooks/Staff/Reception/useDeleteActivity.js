import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../useAuthContext';

const useActivityDelete = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const deleteActivity = async (activityName) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/watersport/activities/${activityName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }else {
        navigate("/WatersportsManagement");
        alert('Activity deleted successfully');
      }

      
      // Optionally, redirect or trigger a list refresh here...
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteActivity, isLoading, error, status };
};

export default useActivityDelete;