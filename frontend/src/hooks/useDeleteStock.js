import { useState } from 'react';

 const useDeleteStock = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const deleteStock = async (stockName) => {
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await fetch(`http://localhost:4000/kitchenStock/delete/${stockName}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.error);
          }
          
          setIsLoading(false);
          setStatus(data.status);
          window.location.reload();

          /*else {
            navigate("/KitchenInventory");
            alert('Activity deleted successfully');
          }*/
    
          
          // Optionally, redirect or trigger a list refresh here...
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
    
      return { deleteStock, isLoading, error, status };
    };
  export default useDeleteStock;  
    