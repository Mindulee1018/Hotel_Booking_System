import { useState } from "react";
import { FaUsers, FaUserCog } from 'react-icons/fa';
import { IoMdCalendar, IoMdSettings } from 'react-icons/io';
import Adminsidebar from "../../components/AdminSidebar";

function AdminDash(){

  return(
    <div className="container-fluid p-0">
      <div className="row m-0 p-0">
        <div className="col-md-3 p-0">
          <Adminsidebar/>
        </div>
        <div className="col-md-9">
          <div className="row h4 mb-5" style={{height:"75px"}}>
            <div><p className="mt-5">Admin Dashboard</p></div>
          </div>
          <div className="row d-flex justify-content-around h-25">
            <div className="card col-2 pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75"><FaUsers size={50} color="white"/><a className="nav-link mt-5 fs-5 text-white" aria-current="page" href="/Staffmanage">Staff Management</a></div>
            <div className="card col-2  pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75"><FaUserCog size={50} color="white"/><a className="nav-link mt-5 fs-5 text-white" aria-current="page" href="/Usermanage">User Management</a></div>
            <div className="card col-2  pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75"><IoMdSettings size={50} color="white"/><a className="nav-link mt-5 fs-5 text-white" aria-current="page" href="/Accountmanage">Account Manage</a></div>
          </div>
          <hr></hr>
          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%', // Set the width to 100%
              maxWidth: '540px', // Limit the maximum width
              height: '380px'
            }}
            src="https://charts.mongodb.com/charts-project-0-sqqdz/embed/charts?id=660ab80c-c20d-4b70-84cf-523695f27b2a&maxDataAge=60&theme=light&autoRefresh=true"
            title="MongoDB Chart"
          ></iframe>
        </div>
      </div>
    </div>
  );

}

export default AdminDash;