import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../useAuthContext";

const useDeleteBuffet = () => {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteBuffetItem = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/buffet/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        navigate("/manageBuffet");
        alert("Reservation deleted successfully!");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteBuffetItem, isLoading, error };
};

export default useDeleteBuffet;