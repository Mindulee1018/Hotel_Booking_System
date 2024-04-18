// In useUpdate hook
import { useState } from 'react'



export const useUpdate = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  

  const Update = async (password, newpassword) => {
    setIsLoading(true);
    setError(null);

    const email= localStorage.getItem('email');


    try {

      const response = await fetch(`http://localhost:4000/user/update/${email}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, newpassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Password updated successfully
      setIsLoading(false);
      setStatus(data.status);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
 
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      
    }
  };

  return { Update, isLoading, error,status };
};


