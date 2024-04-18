import { useEffect, useState } from "react";

const RoomReservationList = () => {
  const [roomreservation, setReservation] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch("http://localhost:4000/roomreservation/getreservation");
        if (!response.ok) {
          throw new Error("Failed to fetch reservation");
        }
        const json = await response.json();
        setReservation(json);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setError(error.message);
      }
    };
    fetchReservation();
  }, []);

  return { roomreservation, error };
};

export default RoomReservationList;
