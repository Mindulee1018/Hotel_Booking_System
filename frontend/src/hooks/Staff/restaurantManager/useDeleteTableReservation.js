import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../useAuthContext";

const useDeleteReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteTableReservation = async (reservationId) => {
    setIsLoading(true); 

    try {
      const response = await fetch(`http://localhost:4000/table/delete/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
       
        throw new Error(`Failed to delete reservation (${response.status})`);
      }

      setIsLoading(false); 
      window.location.reload();
     
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      return false; 
    }
  };

  return { deleteTableReservation, isLoading, error };
};


export default useDeleteReservation;
