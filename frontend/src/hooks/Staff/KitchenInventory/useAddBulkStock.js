import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useAddBulkStock = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

 const addBulkStock = async (bname, bcategory,bquantity,breorderLevel,bunits, bprice,bexpiryDate,bdescription) => {

    const bulkStockDetails = {
        bname, bcategory,bquantity,breorderLevel,bunits, bprice,bexpiryDate,bdescription,
    };

     setIsLoading(true);
     setError(null);

     try {
       const response = await fetch('http://localhost:4000/kitchenBulkStock/add', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(bulkStockDetails),
       });

       if (!response.ok) {
         const json = await response.json();
         setError(json.error);
       } else {
         navigate('/BulkStock');
       }
     } catch (error) {
       setError("An unexpected error occurred");
     } finally {
       setIsLoading(false);
     }
   };
  
   
    return { addBulkStock, isLoading, error };
};

export default useAddBulkStock;