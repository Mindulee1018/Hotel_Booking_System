import { useState } from 'react';

export const useDelete = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const deleteUser = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/user/delete/${email}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsLoading(false);
      setStatus(data.status);
      window.location.reload()
      
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading, error, status };
};
