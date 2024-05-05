import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddReservation = () => {
  const [availability, setAvailability] = useState({ availableCount: 0, availableTables: [] });
  const [error, setError] = useState(null);

  // Function to check table availability
  const checkAvailability = async (date, timeSlot) => {
    try {
      const response = await fetch(`http://localhost:4000/table/availability/${date}/${timeSlot}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to check availability');
      }

      const data = await response.json();
      setAvailability({
        availableCount: data.availableCount,
        availableTables: data.availableTables,
      });

      setError(null);
    } catch (err) {
      setError('Error checking table availability.');
      console.error(err);
    }
  };

  // Function to create a new reservation
  const reserveTable = async (reservationData) => {
    try {
      const response = await fetch('http://localhost:4000/table/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      alert('Reservation created successfully!');
      setError(null);
    } catch (err) {
      setError('Error creating reservation.');
      console.error(err);
    }
  };

  return {
    checkAvailability,
    reserveTable,
    availability,
    error,
  };
};

export default useAddReservation