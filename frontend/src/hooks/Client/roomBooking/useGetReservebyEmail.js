import { useEffect, useState } from "react";

const GetReservebyEmail = (Email) => {
    const [roomReservations, setRoomReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    
  
    useEffect(() => {
      const fetchReservations = async () => {
        setLoading(true);
        try {
          // Construct the URL based on whether email is provided or not
          const response = await fetch (`http://localhost:4000/roomreservation/reservations/${Email}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch reservations`);
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
    }, [Email]); // Run effect when email changes
  
    return { roomReservations, loading, error };
  };
  
  export default GetReservebyEmail;
  