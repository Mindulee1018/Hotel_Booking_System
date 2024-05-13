import React, { useState } from 'react';
import useHotelData from '../hooks/useHotelDetails';


function Footer(){
  const { hotel, error } = useHotelData();

    return(
      <div>
         <footer className="bg-dark text-light py-5 mt-4">
             <div className="container">
               <div className="row">
                 <div className="col-md-4">
                   <h2 className="mb-4">About Us</h2>
                   {hotel.map(data=> (
                   <div>{data.Aboutus}</div>))}
                 </div>

                 <div className="col-md-4">
                   <h2 className="mb-4">Explore</h2>
                   <ul className="list-unstyled">
                     <li><a href="/roomReservation">Accomadation</a></li>
                     <li><a href="/DiningDashboard">Dining</a></li>
                     <li><a href="/AllHalls">Events</a></li>
                     <li><a href="/Watersports">Watersports</a></li>
                   </ul>
                 </div>
                 <div className="col-md-4">
                   <h2 className="mb-4">Contact Us</h2>
                   {hotel.map(data=> (
                   <ul className="list-unstyled">
                     <li><i className="fas fa-map-marker-alt me-2"></i>{data.address}</li>
                     <li><i className="fas fa-phone-alt me-2"></i>{data.phoneno}</li>
                     <li><i className="fas fa-envelope me-2"></i>{data.email}</li>
                   </ul>
                   ))}
                   <div className="social-links">
                     <a href="https://www.facebook.com/sunsetaraliyahotel/"><i className="fab fa-facebook-f">Facebook Page</i></a>
                   </div>
                 </div>
               </div>
             </div>
             {hotel.map(data=> (
             <div className="text-center mt-5">
               <p>&copy; {data.name} All Rights Reserved.</p>
             </div>))}

      
             </footer>
      </div>
    )}

 export default Footer;   



