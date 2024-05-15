import { useState } from 'react'
import { useAuthContext } from '../../useAuthContext'
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigation = useNavigate();

  const signup = async (email, password,repassword,name) => {
    setIsLoading(true)
    setError(null)

    if (password !== repassword) {
      setIsLoading(false)
      setError('Passwords do not match')
      return; 
    }

    const response = await fetch('http://localhost:4000/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password ,name})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      localStorage.setItem('email', email);

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      alert("Thank you for signing up! To complete your registration, we've sent a verification email")
      navigation('/Login')
      window.location.reload()
      
    }
  }

  return { signup, isLoading, error }
}