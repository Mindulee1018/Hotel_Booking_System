// In useUpdate hook
import { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../useAuthContext'



export const useDelete = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { dispatch } = useAuthContext()
  

  const Deleteuser= async () => {
    setIsLoading(true);
    setError(null);

    const email= localStorage.getItem('email');
  


    try {

      const response = await fetch(`http://localhost:4000/user/delete/${email}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      //successfull
      setIsLoading(false);
      setStatus(data.status);

      alert('Account deleted successfully');
      
      // logout();
      localStorage.removeItem('user')
      localStorage.removeItem('email')

      // dispatch logout
      dispatch({type:'LOGOUT'})
      window.location.reload()
      
      
 
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      
    }
  };

  return { Deleteuser, isLoading, error,status };
};