import React, { useState } from "react";

import { useLogout } from "../hooks/useLogout";

function ReceptionNavbar() {
  const { logout } = useLogout();
  let selectedId = localStorage.getItem("selectedMenuId")
    ? localStorage.getItem("selectedMenuId")
    : "Home";

  const handlelogout = () => {
    logout();
  };

  const setSelectedId = (id) => {
    localStorage.setItem("selectedMenuId", id);
  };

  return (
    <div className="col-2">
      <ul className="nav flex-column bg-black pe-1 vh-100 position-fixed">
        <div
          className="d-flex flex-column  mt-5 justify-content-around fs-5"
          style={{ height: "250px" }}
        >
          <li
            className={`${
              selectedId === "Home" ? `bg-secondary` : `nav-item border`
            }`}
          >
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/ReceptionDashboard"
              onClick={() => setSelectedId("Home")}
            >
              Home
            </a>
          </li>

          <li
            className={`${
              selectedId === "Watersports Management"
                ? `bg-secondary`
                : `nav-item border my-2`
            }`}
          >
            <a
              className="nav-link text-white fs-6"
             
              href="/WatersportsManagement"
              onClick={() => setSelectedId("Watersports Management")}
            >
              Watersports Management
            </a>
          </li>

          <li
            className={`${
              selectedId === "Watersports Reservations"
                ? `bg-secondary`
                : `nav-item border my-2`
            }`}
          >
            <a
              className="nav-link text-white fs-6"
              
              href="/watersportReservations"
              onClick={() => setSelectedId("Watersports Reservations")}
            >
              Watersport Reservations
            </a>
          </li>

          <li
            className={`${
              selectedId === "Add a Watersport Reservation"
                ? `bg-secondary`
                : `nav-item border my-2`
            }`}
          >
            <a
              className="nav-link text-white fs-6"
              
              href="/selectActivity"
              onClick={() => setSelectedId("Add a Watersport Reservation")}
            >
              Add Watersport Reservations
            </a>
          </li>

          <li
            className={`${
              selectedId === "Dining Reservations"
                ? `bg-secondary`
                : `nav-item border my-2`
            }`}
          >
            <a
              className="nav-link text-white fs-6"
              
              href="/DiningReservations"
              onClick={() => setSelectedId("Dining Reservations")}
            >
              Dining Reservations
            </a>
          </li>
        </div>
        <div className="">
          <a
            href=""
            id="userStatus"
            className="btn mt-5"
            sty
            onClick={handlelogout}
            style={{
              backgroundColor: "rgb(85, 180, 254)",
              position: "relative",
              top: "190px",
            }}
          >
            Logout
          </a>
        </div>
      </ul>
    </div>
  );
}

export default ReceptionNavbar;
