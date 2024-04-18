import { useState } from 'react';

export const useForgot= () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const forgotPassword = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/user/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setIsLoading(false);
      setStatus(data.status);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {  setEmail, isLoading, error, forgotPassword,status };
};


