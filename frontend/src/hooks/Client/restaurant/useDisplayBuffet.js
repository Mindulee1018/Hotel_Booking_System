
import { useState, useEffect } from 'react';

const useDisplayBuffet = (Category) => {
  const [buffetItems, setbuffetItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuffet = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/buffet/get`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu items by category');
        }
        const data = await response.json();
        setbuffetItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuffet();
  }, []);

  return { buffetItems, isLoading, error };
};

export default useDisplayBuffet;
