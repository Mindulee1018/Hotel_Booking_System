import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddBuffet = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addBuffet = async (BuffetName, Description, Time, Price ,Image) => {
    setIsLoading(true);
    setError(null);

    console.log(Image, "fileee");

    const formData = new FormData();
    formData.append("BuffetName", BuffetName);
    formData.append("Description",Description);
    formData.append("Time", Time);
    formData.append("Price", Price);
    if (Image) {
      formData.append("Image", Image);
    }

    try {
      const response = await fetch("http://localhost:4000/buffet/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/manageBuffet");
        alert("Activity Added successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  
  return { addBuffet, isLoading, error };
};

export default useAddBuffet;
