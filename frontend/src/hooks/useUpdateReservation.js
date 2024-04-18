import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateReservation = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateReservation = async (
    id,
    Date,
    Name,
    Capacity,
    email,
    contactNumber
  ) => {
    console.log("updateReservation");

    const reservationDetails = {
      Date,
      Name,
      Capacity,
      email,
      contactNumber,
    };

    setIsLoading(true);
    setError(null);
    window.location.reload();

    try {
      const response = await fetch(`http://localhost:4000/table/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationDetails),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/TableReservations");
        alert("Reservation details successfully!");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateReservation, isLoading, error };
};

export default useUpdateReservation;
