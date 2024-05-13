import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateMenu = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMenuItem = async (itemId, updatedProductName, updatedPrice) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/menu/update/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: updatedProductName,
          Price: updatedPrice,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage);
      }

      // Update local state if the update was successful
      setProductName(updatedProductName);
      setPrice(updatedPrice);
    } catch (error) {
      setError(error.message || 'Failed to update menu item');
    } finally {
      setIsLoading(false);
    }
  };

  return { productName, setProductName, price, setPrice, isLoading, error, updateMenuItem };
}
export default useUpdateMenu;
