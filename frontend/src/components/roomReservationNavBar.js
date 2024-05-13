import React, { useState } from "react";

function RoomReservationNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white mt-2">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-black bg-primary bg-opacity-50 ms-3"
                aria-current="page"
                href="/roomBookings"
              >
                Upcoming Reservations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black bg-primary bg-opacity-50 ms-3" href="/PastRoomBookings">
                Past Reservations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default RoomReservationNavbar;
