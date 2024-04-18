import { useState } from "react"
import { FaBed, FaUsers, FaUserCog } from 'react-icons/fa';
import { BiBook, BiCheck, BiExit, BiBarChart } from 'react-icons/bi';
import { AiOutlineDashboard, AiOutlineDollar } from 'react-icons/ai';
import { IoMdCalendar, IoMdSettings } from 'react-icons/io';
function StaffDash(){


return(

<div className=" bg-info-subtle vh-100 row">
<div className="col-3">
<ul className="nav flex-column bg-black vh-100">
<img src="logo.jpg"style={{width:"150px", position:"relative", left:"107px"}} className="mt-4"></img>
<div className="d-flex flex-column bg-info h-25 mt-5 justify-content-around">
  <li className="nav-item ">
    <a className="nav-link active" aria-current="page" href="#">Manage Users</a>
  </li>
  <li className="nav-item">
    <a className="nav-link " aria-current="page" href="#">Manage Staff</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" aria-current="page" href="#">Create Staff</a>
  </li>
</div>
</ul>
</div>
<div className="col d-flex justify-content-between">

    
    
</div>
</div>
  
);

}

export default StaffDash