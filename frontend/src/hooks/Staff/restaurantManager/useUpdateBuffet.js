import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateBuffet = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateBuffet = async (
    id,
    BuffetName,
    Description,
    Time,
    Price
    //image
    
  ) => {
    console.log("UpdateMenu")
    const buffetDetails = {
        BuffetName,
        Description,
        Time,
        Price
        //image
    };

    setIsLoading(true);
    setError(null);
    window.location.reload();

    try {
      const response = await fetch(`http://localhost:4000/buffet/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buffetDetails),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/manageBuffet");
        alert("Reservation details successfully!");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateBuffet, isLoading, error };
};

export default useUpdateBuffet;
