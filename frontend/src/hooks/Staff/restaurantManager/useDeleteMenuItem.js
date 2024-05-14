import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../useAuthContext";

const useDeleteMenu = () => {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteMenuItem = async (Id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/menu/${Id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        navigate("/menu");
        alert("Iteam deleted successfully!");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {deleteMenuItem, isLoading, error };
};

export default useDeleteMenu;