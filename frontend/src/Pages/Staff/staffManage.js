import React, { useState } from 'react';
import useManagerList from "../../hooks/Staff/useDisplaystaff";
import Adminsidebar from "../../components/AdminSidebar";
import { useDelete } from '../../hooks/Staff/useAccountDelete';
import { useUpdate } from '../../hooks/Staff/useAccountUpdate';

function Staffmanage() {
  const { managerList, staffList } = useManagerList();
  const { deleteUser } = useDelete()
  const [emailToDelete, setEmailToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { updateUser, isLoading, error, status } = useUpdate()
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredManagers = managerList.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handledelete = async (email) => {
    await deleteUser(emailToDelete)
    setEmailToDelete('');
  }

  const handleSubmit = async (email) => {

    setEmailToDelete('');
    await updateUser(emailToDelete, password, newPassword)

  }

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 m-0 p-0">
        <Adminsidebar />
      </div>
      <div className="col-md-9">
        <div className="row">
          <h2 className="mb-3 mt-3">Staff Accounts</h2>
          <div><input
                type="search"
                placeholder="Search by name..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /></div>
          <div className="col">
            <h5 className="mb-4">Managers</h5>
            {filteredManagers.map(manager => (
              <div className="card pt-3 bg-dark text-white mb-2" key={manager.email}>
                <div>
                  <div>Name: {manager.name}</div>
                  <div>Email: {manager.email}</div>
                  <div>Role: {manager.role}</div>
                </div>
                <div className="d-flex justify-content-around">
                  <button className="btn btn-sm btn-danger mt-4 mb-3" onClick={() => setEmailToDelete(manager.email)} data-bs-toggle="modal" data-bs-target="#Modal">Delete</button>
                  <button className="btn btn-sm btn-primary mt-4 mb-3" onClick={() => setEmailToDelete(manager.email)} data-bs-toggle="modal" data-bs-target="#Modal2">Update</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h5 className="mb-4">Staff</h5>
            {filteredStaff.map(staff => (
              <div className='card pt-3 mb-4 bg-dark text-white' key={staff.email}>
                <div>
                  <div>Name: {staff.name}</div>
                  <div>Email: {staff.email}</div>
                  <div>Role: {staff.role}</div>
                </div>
                <div className="d-flex justify-content-around">
                  <button className="btn btn-sm btn-danger mt-4 mb-3" onClick={() => setEmailToDelete(staff.email)} data-bs-toggle="modal" data-bs-target="#Modal">Delete</button>
                  <button className="btn btn-sm btn-primary mt-4 mb-3" onClick={() => setEmailToDelete(staff.email)} data-bs-toggle="modal" data-bs-target="#Modal2">Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>




      {/* model  */}
      <div className="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Are You Sure?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Staff?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              <form action="" method="delete">

                <button className="btn btn-outline-danger" onClick={handledelete}>DELETE</button>

              </form>

            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Modal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Password Update</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value); }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">New Password:</label>
                  <input type="password" className="form-control" id="confirmPassword" placeholder="Enter New password" onChange={(e) => { setNewPassword(e.target.value); }} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                <button className="btn btn-outline-primary" type="submit" disabled={isLoading}>Update</button>


              </div>
            </div></form>
        </div>
      </div>


    </div>



  )
}

export default Staffmanage
