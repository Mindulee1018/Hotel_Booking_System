import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateReserv = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateReserv = async (
    id,
    CusName,
    TelNo,
    Address,
    checkinDate,
    checkinTime,
    Qty,
    activityIds
  ) => {
    console.log("updateReserv");

    const reservationDetails = {
      CusName,
      TelNo,
      Address,
      checkinDate,
      checkinTime,
      Qty,
      activityIds,
    };

    setIsLoading(true);
    setError(null);
    window.location.reload();

    try {
      const response = await fetch(
        `http://localhost:4000/watersportReservation/reservations/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationDetails),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/watersportReservations");
        alert("Reservation updated successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateReserv, isLoading, error };
};

export default useUpdateReserv;
