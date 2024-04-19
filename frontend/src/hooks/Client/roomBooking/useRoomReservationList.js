import { useEffect, useState } from "react";

const RoomReservationList = () => {
  const [roomReservations, setRoomReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/roomreservation/getreservation");
        if (!response.ok) {
          throw new Error(`Failed to fetch reservations: ${response.status}`);
        }
        const json = await response.json();
        setRoomReservations(json);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { roomReservations, loading, error };
};

export default RoomReservationList;
