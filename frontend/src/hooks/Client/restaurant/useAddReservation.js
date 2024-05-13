import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddReservation = () => {
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [reservationMessage, setReservationMessage] = useState('');
  const navigation = useNavigate();

  const checkAvailability = async (date, timeSlot) => {
    try {
      const response = await fetch(
        `http://localhost:4000/table/availability/${date}/${timeSlot}`
      );

      const data = await response.json();
      setAvailabilityMessage(data.message);
    } catch (error) {
      setAvailabilityMessage('Error checking availability.');
    }
  };

  const makeReservation = async (reservationData) => {
    try {
      const response = await fetch(
        'http://localhost:4000/table/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        }
      );

      const data = await response.json();
      alert("Table reservation success")
      navigation('/DiningDashboard')
      setReservationMessage(data.message);
    } catch (error) {
      setReservationMessage('Error making reservation.');
    }
  };

  return {
    availabilityMessage,
    reservationMessage,
    checkAvailability,
    makeReservation,
  };
};

export default useAddReservation