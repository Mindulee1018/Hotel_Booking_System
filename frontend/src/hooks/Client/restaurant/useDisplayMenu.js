import { useState, useEffect } from 'react';

const useMenuByCategory = (category) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchMenuByCategory = async () => {
    console.log('Current category:', category);  // Check the current category value

    if (!category || category === 'all') {
      setMenuItems([]); // Optionally fetch all items or reset
      return;
    }

    setIsLoading(true);
    setError(null); // Reset previous errors

    try {
      const url = `http://localhost:4000/menu/get/${encodeURIComponent(category)}`;
      console.log('Fetching URL:', url);  // Check the URL being requested
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu items for category: ${category}`);
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Fetch error:', error);  // Log errors to console
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchMenuByCategory();
}, [category]);

  return { menuItems, isLoading, error };
};

export default useMenuByCategory;
