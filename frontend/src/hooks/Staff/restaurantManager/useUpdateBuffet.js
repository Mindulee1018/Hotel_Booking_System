import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const useUpdateBuffetPrice = () => {
  // Define state variables
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Function to update buffet price
  const updatePrice = async (buffetName, newPrice) => {
    setLoading(true);
    setError(null);

    try {
      // Send a request to update the buffet price
      const response = await fetch(`http://localhost:4000/buffet/update/${buffetName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Price: newPrice }),
      });

      if (!response.ok) {
        throw new Error('Failed to update buffet price');
      }

      // Update price state if successful
      setPrice(newPrice);
      navigate("/manageBuffet")
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { price, loading, error, updatePrice };
};

export default useUpdateBuffetPrice;
