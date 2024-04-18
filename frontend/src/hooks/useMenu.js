
import { useState, useEffect } from 'react';

const useMenuList = () => {
  const [menuList, setMenuList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        // Fetch Activity list
        const Response = await fetch('http://localhost:4000/menu/get');
        if (!Response.ok) {
          throw new Error('Failed to fetch Activity list');
        }
        const Data = await Response.json();
        setMenuList(Data);
 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menuList, isLoading, error };
};

export default useMenuList;