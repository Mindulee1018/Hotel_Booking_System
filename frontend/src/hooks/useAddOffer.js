import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddOffer = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addOffers = async (offerID, offerName, Date, description, ImageFile) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("offerID", offerID);
    formData.append("offerName", offerName);
    formData.append("Date", Date);
    formData.append("description", description);
    if (ImageFile) {
      formData.append("Image", ImageFile);
    }

    try {
      const response = await fetch("http://localhost:4000/offer/addOffer", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();  // Always parsing JSON to handle both success and error

      if (!response.ok) {
        setError(json.error ? json.error : "An unexpected error occurred");
        console.error("Error from server:", json);
      } else {
        navigate("/Offers");
        alert("Offer Added successfully");
      }
    } catch (error) {
      setError("Failed to fetch: " + error.message);
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addOffers, isLoading, error };
};

export default useAddOffer;
