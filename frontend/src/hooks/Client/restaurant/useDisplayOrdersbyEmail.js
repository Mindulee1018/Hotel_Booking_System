import { useState, useEffect } from 'react';

const useOrderList = (email) => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Fetch orders by email
        const response = await fetch(`http://localhost:4000/order/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrderList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      fetchOrders();
    } else {
      setOrderList([]);
    }
  }, [email]);

  return { orderList, isLoading, error };
};

export default useOrderList;
