import React ,{useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePwdReset } from '../hooks/usePwdReset';

const PasswordReset = () => {
  const { token } = useParams();
  const {password,repassword,setPassword,setRepassword,isLoading,error,resetPassword,status} = usePwdReset();
  const [showPassword, setShowPassword] = useState(false);
  const [showconPassword, setShowconPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(token);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleconPasswordVisibility = () => {
    setShowconPassword(!showconPassword);
  };

  return (

    <div className='vh-100 d-flex justify-content-center align-items-center'>
     
      <form onSubmit={handleSubmit} >
      <h2>Password Reset</h2>
      <div class="mb-3">
        <label for="password" class="form-label">New password</label><br></br>
        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
        <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</button>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Confirm password</label><br></br>
        <input type={showconPassword ? "text" : "password"} id="repassword" value={repassword} onChange={(e) => setRepassword(e.target.value)} required></input>
        <button type="button" onClick={toggleconPasswordVisibility}>{showconPassword ? "Hide" : "Show"}</button>
      </div>

      <button type="submit" class="btn btn-primary" disabled={isLoading}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <div className="error bg-primary my-2" style={{color:"white"}}>{status}</div>}
      </form>
    </div>
    
  );
};

export default PasswordReset;
