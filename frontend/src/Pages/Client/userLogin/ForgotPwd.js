import React from 'react';

import { useForgot } from '../../../hooks/Client/userLogin/useForgot';

function Forgotpassword(){
  const {  setEmail, isLoading, error,forgotPassword ,status } = useForgot();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword ();
  };
  return (
    <div className='vh-100 container-fluid d-flex align-items-center' style={{backgroundImage: 'url("Wave.svg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className='row w-100'>
      <div className='col-6 container bg-body-tertiary ms-4 border d-flex align-items-center justify-content-center '><h3>Forgot Password</h3></div> 
      <div className="container bg-body-tertiary w-50 py-4 col">
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Enter Registered Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required></input>
        
      </div>

      <button type="submit" class="btn btn-primary" disabled={isLoading}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {status && <div className="error bg-primary my-2" style={{color:"white"}}>{status}</div>}
      </form>
      </div>
    </div>
    </div>
  );
  }
export default Forgotpassword;

