
import React, { useState } from 'react';

import { useLogout } from '../hooks/Client/userLogin/useLogout';

function Inventorysidebar(){

  const {logout}=useLogout()
 

  const handlelogout = ()=>{
      logout()
    }


  

    function resetfeilds(){
      var pwd = document.getElementById("Password1");
      var newpwd = document.getElementById("Password2");

      pwd.value = null;
      newpwd.value =null;
    }
    return(
        <div className="col-2 m-0 p-0">
        <ul className="nav flex-column bg-black pe-1 vh-100">
       
        <div className="d-flex justify-content-center align-items-center"><img src="Sunset Araliya horizontal.png"  style={{width:"150px"}} className="mt-4 "></img></div>
        <div className="d-flex flex-column  mt-5 justify-content-around fs-5" style={{height:"250px"}}>
          <li className="nav-item border">
            <a className="nav-link text-white fs-6" aria-current="page" href="/HotelView">Inventory Details</a>
          </li>
          <li className="nav-item border">
            <a className="nav-link text-white fs-6" aria-current="page" href="/AddItem">Add Items</a>
          </li>
          <li className="nav-item border">
            <a className="nav-link text-white fs-6" aria-current="page" href="/EditItem">Edit Items</a>
          </li>
          <li className="nav-item border">
            <a className="nav-link text-white fs-6" aria-current="page" href="/RoomManagerView">Room Manager View</a>
          </li>
          <li className="nav-item border">
            <a className="nav-link text-white fs-6" aria-current="page" href="/AdminDashbord" data-bs-toggle="modal" data-bs-target="#Modal2" >Profile</a>
          </li>
        </div>
        <div className=""><a href ="" id="userStatus" className="btn mt-5" sty onClick={handlelogout} style={{backgroundColor:"rgb(85, 180, 254)", position:"relative", top:"190px"}}>Logout</a></div>
        </ul>






        </div>
    )
}

export default Inventorysidebar;