import React, { useState } from 'react';
import { useAccountCreate } from "../../../hooks/Staff/userManagement/useAccountCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function CreatePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const {create, error, isLoading} = useAccountCreate()
  const isAdminCreation = true;
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    await create(email, password, confirmPassword,name,role,isAdminCreation)
  };

  const handleTogglePwd=()=>{
    setShowPassword(!showPassword);
  }

  const handleToggleRePwd=()=>{
    setShowRePassword(!showRePassword);
  }

  return (
    <div className="container-fluid mt-5  bg-body-tertiary border">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="mb-4">Assign Staff Users</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="row">
              <div className="col-11"><input type={showPassword ? 'text' : 'password'} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <div className='col mt-1'>
              <button
                         type="button"
                         onClick={handleTogglePwd}>
                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="row">
              <div className='col-11'><input type={showRePassword ? 'text' : 'password'} className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
              <div className='col mt-1'>                    
              <button
                         type="button"
                         onClick={handleToggleRePwd}>
                         <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} />
              </button>
              </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="form-select pe-3 text-center" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mb-4 " disabled={isLoading} >Create</button><br></br>
            {error && <div className="error bg-danger mt-4" style={{color:"white"}}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
