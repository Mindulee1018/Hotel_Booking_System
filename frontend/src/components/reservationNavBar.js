import React, { useState } from "react";

function ReservationNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white mt-2">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-black bg-primary bg-opacity-50 ms-3"
                aria-current="page"
                href="/watersportReservations"
              >
                Upcoming Reservations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black bg-primary bg-opacity-50 ms-3" href="/PastReservations">
                Past Reservations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default ReservationNavbar;
