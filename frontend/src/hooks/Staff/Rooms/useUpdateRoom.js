import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateRoom = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateRoom = async (
    id,
    Rtype,
    description,
    capacity,
    NoOfBeds,
    price
  ) => {
    const roomDetails = {
      Rtype,
      description,
      capacity,
      NoOfBeds,
      price,
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/rooms/updateRoom/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomDetails),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/rooms");
        alert("Room updated successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateRoom, isLoading, error };
};

export default useUpdateRoom;
