import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const useUpdateStock = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateStock = async (id,name, category,quantity,reorderLevel, price,expiryDate,description) => {
    console.log("updateStock");

    const stockDetails = {
      name, category,quantity,reorderLevel, price,expiryDate,description,
  };

    setIsLoading(true);
    setError(null);
    window.location.reload();

    try {
      const response = await fetch(
        `http://localhost:4000/kitchenStock/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stockDetails),
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/KitchenInventory");
        alert("Inventory updated successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStock, isLoading, error };
};


export default useUpdateStock;

        
        