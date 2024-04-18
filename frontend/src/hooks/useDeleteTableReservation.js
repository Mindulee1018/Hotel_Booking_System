import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useDeleteReservation = () => {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteTableReservation = async (reservationId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/table/${reservationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        navigate("/TableReservations");
        alert("Reservation deleted successfully!");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteTableReservation, isLoading, error };
};

export default useDeleteReservation;
