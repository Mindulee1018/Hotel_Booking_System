import { useState, useEffect } from 'react';

const useTableReservationsByEmail = (email) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:4000/table/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchReservations();
    }

   
    return () => {
      
    };
  }, [email]);

  return { reservations, loading, error };
};

export default useTableReservationsByEmail