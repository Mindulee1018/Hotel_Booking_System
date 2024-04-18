import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const useUpdateBulkStock = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const updateBulkStock = async (id,bname, bcategory,bquantity,bunits, bprice,bdescription) => {
      console.log("updateBulkStock");
  
      const bulkStockDetails = {
        bname, bcategory,bquantity,bunits, bprice,bdescription,
    };
  
      setIsLoading(true);
      setError(null);
      window.location.reload();
  
      try {
        const response = await fetch(
          `http://localhost:4000/kitchenBulkStock/update/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bulkStockDetails),
          }
        );
  
        if (!response.ok) {
          const json = await response.json();
          setError(json.error);
        } else {
          navigate("/BulkStock");
          alert("Inventory updated successfully");
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
  
    return { updateBulkStock, isLoading, error };
  };
  export default useUpdateBulkStock;