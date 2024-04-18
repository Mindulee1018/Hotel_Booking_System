// useHotelData.js
import { useState, useEffect } from 'react';

const useHotelData = () => {
  const [hotel, setHotel] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch('http://localhost:4000/hotel/hoteldetails');
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHotelData();
  }, []);

  return { hotel, error };
};

export default useHotelData;
