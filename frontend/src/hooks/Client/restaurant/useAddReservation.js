import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddReservation = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const AddResev = async (Date, Name, Capacity, email, contactNumber) => {
    const reservDetails = {
      Date,
      Name,
      Capacity,
      email,
      contactNumber,
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/table/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservDetails),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/TableReservations");
      }
    } catch (error) {
      console.log(error, "error");
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { AddResev, isLoading, error };
};

export default useAddReservation;
