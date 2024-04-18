import { useState } from 'react';

export const useUpdate = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (email, password, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/user/update/${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, newpassword: newPassword}) 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsLoading(false);
      setStatus(data.status);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error, status };
};
