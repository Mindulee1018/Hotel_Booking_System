// Assuming this hook is in a file named useWatersportReservation.js
import { useState, useEffect } from 'react';

const useWatersportReservation = () => {
  const [reservationList, setReservationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        // Fetch reservation list
        const reservationResponse = await fetch(
          "http://localhost:4000/watersportReservation/"
        );
        if (!reservationResponse.ok) {
          throw new Error("Failed to fetch watersport reservations");
        }
        let reservationData = await reservationResponse.json();
        setReservationList(reservationData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservationList, isLoading, error };
};

export default useWatersportReservation;
