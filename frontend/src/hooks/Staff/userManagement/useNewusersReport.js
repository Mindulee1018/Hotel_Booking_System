import { useState, useEffect } from 'react';

const useNewAccountsData = () => {
  const [newAccountsData, setNewAccountsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewAccountsData = async () => {
      try {
        const response = await fetch( ' http://localhost:4000/user/newuser/report', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch new accounts data');
        }

        const data = await response.json();
        setNewAccountsData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewAccountsData();
  }, []);

  return { newAccountsData, loading, error };
};

export default useNewAccountsData;
