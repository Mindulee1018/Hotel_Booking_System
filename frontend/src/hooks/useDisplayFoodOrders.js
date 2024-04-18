import { useState, useEffect } from 'react';

const useOrderList = () => {
  const [OrderList, setOrderList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTable = async () => {
      setIsLoading(true);
      try {
        // Fetch Table list
        const Response = await fetch("http://localhost:4000/order/");
        if (!Response.ok) {
          throw new Error('Failed to fetch Table list');
        }
        let Data = await Response.json();
        setOrderList(Data);
 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTable();
  }, []);

  return { OrderList, isLoading, error };
};

export default useOrderList;