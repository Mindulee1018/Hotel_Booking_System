import React, { useState, useEffect } from 'react';
import NewHallDash from '../../../components/NewHallDash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarAlt, faDatabase } from '@fortawesome/free-solid-svg-icons';
import "../../Staff/halllist.css";
import { Link } from 'react-router-dom';
import HallAdminsidebar from '../../../components/HallAdminSidebar';

function HallAdminDash() {
  const [reservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    fetchReservationCount();
  }, []);

  const fetchReservationCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/hallR/hallres');
      if (!response.ok) {
        throw new Error('Failed to fetch reservation count');
      }
      const responseData = await response.json();
      const { data } = responseData;
      // Check if data is an array and has a length property
      if (Array.isArray(data) && data.length !== undefined) {
        const count = data.length;
        setReservationCount(count);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching reservation count:', error.message);
    }
  };
  

  return (
    
      <div className="row">
      
          <HallAdminsidebar />
       
        <div className="col-md-9">
    <div className="">
   
      <div className="">
        <div className="row justify-content-center mt-5">
          <div className="col-md-3 mb-4 ">
            <div className="card h-100 rounded bg-light">
              <div className="card-body d-flex flex-column align-items-center justify-content-center pl-5">
                <h5 className="card-title pt-5 pb-5"><FontAwesomeIcon icon={faHotel} className="mr-2" />Halls</h5>
                <Link to="/halls" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 ">
            <div className="card h-100 rounded bg-light">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title pt-5 "><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />Reservations</h5>
                <h6 className='pb-5'>Reservation count: {reservationCount}</h6>
                <Link to="/AllReservations" className="btn btn-primary">Check Now</Link>
              </div>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 rounded bg-light">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title pb-5"><FontAwesomeIcon icon={faCalendarAlt} className="mr-4 pt-5 " />Calendar</h5>
                <Link to="/HallCalender" className="btn btn-primary">Check Now</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 rounded bg-light">
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title pt-5 pb-5"><FontAwesomeIcon icon={faDatabase} className="mr-2" />Resources</h5>
                <Link to="/HallResource" className="btn btn-primary" >View</Link>
              </div>
            </div>
          </div>
          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
    </div>
    </div>
   
  );
}

export default HallAdminDash;
