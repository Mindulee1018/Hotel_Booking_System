import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './useAuthContext';

const useDeleteRoom = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const deleteRoom = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/room/deleteRoom/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }else {
        navigate("/UpdateDeleteRoom");
        alert('Room deleted successfully');
      }

      
      // Optionally, redirect or trigger a list refresh here...
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteRoom, isLoading, error, status };
};

export default useDeleteRoom;