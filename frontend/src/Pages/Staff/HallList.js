import React, { useState, useEffect } from 'react'; // Import useState and useEffect from react
import "./halllist.css"; // Import custom CSS file for additional styling
import { Link } from "react-router-dom";

import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import HallAdminsidebar from '../../components/HallAdminSidebar';


const HallList = () => {
  const [halls, setHalls] = useState(null);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await fetch("http://localhost:4000/hall/");
        if (!response.ok) {
          throw new Error("Failed to fetch halls");
        }
        const json = await response.json();
        setHalls(json);
      } catch (error) {
        console.error("Error fetching halls data:", error);
      }
    };
    fetchHall();
  }, []);

  return (
    <div className='row'>
<HallAdminsidebar />
<div className="col-md-9">
    <div className="container ">
      <div className="mt-5 mb-4">
        <h1 className="fw-bold display-4 text-light-blue serif">All Available Halls</h1>
      </div>
      <div className="row">
        {halls ? (
          halls.map((hall) => (
            <div key={hall._id} className="col-md-4 mb-4">
              <div className="card  rounded h-100  hover-bg-light-blue serif">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold"> {hall.Name}</h5>
                  <p className="card-text"> {hall.description}</p>
                  <p className="card-text">Capacity: {hall.capacity}</p>
                  <p className="card-text">Price: {hall.price}</p>
                  <div className="d-flex mt-auto justify-content-end"> {/* Use justify-content-end to move buttons to the right */}
                    <Link to={`/ViewHall/${hall._id}`} className="btn btn-primary rounded-pill me-2  "style={{ minWidth: '100px' }}>
                      View
                    </Link>
                    <Link to={`/EditHall/${hall._id}`} className="btn btn-primary rounded-pill "style={{ minWidth: '100px' }}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="fs-5 fw-light italic">Loading...</p>
        )}
      </div>
    </div>
 </div>
    </div>
    
  );
};

export default HallList;
