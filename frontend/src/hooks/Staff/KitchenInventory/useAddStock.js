import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useAddStock = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

 const addStock = async (name, category,quantity,reorderLevel, price,expiryDate,description) => {

    const stockDetails = {
        name, category,quantity,reorderLevel, price,expiryDate,description,
    };

     setIsLoading(true);
     setError(null);

     try {
       const response = await fetch('http://localhost:4000/kitchenStock/add', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(stockDetails),
       });

       if (!response.ok) {
         const json = await response.json();
         setError(json.error);
       } else {
         navigate('/KitchenInventory');
       }
     } catch (error) {
       setError("An unexpected error occurred");
     } finally {
       setIsLoading(false);
     }
   };
  
   /* const addStock = async (name, category,quantity, price,description) => {
      setIsLoading(true);
      setError(null);
  
  
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Category", category);
      formData.append("Quantity", quantity);
      formData.append("Price", price);
      formData.append("Description", description);
     
      try {
        const response = await fetch("http://localhost:4000/kitchenStock/add", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          const json = await response.json();
          setError(json.error);
        } else {
          navigate("/");
        }
      } catch (error) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };*/
    return { addStock, isLoading, error };
};

export default useAddStock;
