import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './useAuthContext';

const useDeleteOffer = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const deleteOffer = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/offer/deleteOffer/${id}', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }else {
        navigate("/Offers");
        alert('Offer deleted successfully');
      }

      
      // Optionally, redirect or trigger a list refresh here...
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteOffer, isLoading, error };
};

export default useDeleteOffer;