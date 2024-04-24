import { useState } from 'react'
import { useAuthContext } from '../../useAuthContext'
import { useNavigate } from "react-router-dom";


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigation = useNavigate();
  

  const previousPath = localStorage.getItem('prevPath');
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          // If  403, disable the login button
          setIsLoginDisabled(true);
        }
        throw new Error(data.error);
      }

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('email', email);

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: data });

      // Update loading state
      setIsLoading(false);

      // Navigate to the appropriate dashboard based on the role
      navigateUser(data.role);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const navigateUser = (role) => {
    switch (role) {
      case 'admin':
        navigation('/AdminDashbord');
        break;
      case 'manager':
        navigation('/ManagerDashboard');
        break;
      case 'staff':
        navigation('/receptionDashboard')  
        break;
        default:
          if (previousPath === '/Dashboard') {
            navigation('/Dashboard');
          } else {
            
            navigation(-1);
          }
      }
    };

 

  return { login, isLoading, error,isLoginDisabled };
};