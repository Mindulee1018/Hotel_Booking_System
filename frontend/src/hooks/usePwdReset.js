import { useState,useParams } from 'react';

export const usePwdReset= () => {
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const resetPassword = async (token) => {
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/user/resetPassword/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, repassword }),
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

  return { password, repassword, setPassword, setRepassword, isLoading, error, resetPassword ,status};
};
