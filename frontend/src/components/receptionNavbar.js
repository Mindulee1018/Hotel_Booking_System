import React, { useState } from "react";

import { useLogout } from "../hooks/Client/userLogin/useLogout";

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
      <ul className="nav flex-column pe-1 vh-100 position-fixed" style={{ backgroundColor: "#1E3A8A" }}>
        <div
          className="d-flex flex-column  mt-5 justify-content-around fs-5"
          style={{ height: "250px" }}
        >
          <li
            className={`${
              selectedId === "Home" ? `bg-white` : `nav-item border my-2`
            }`}
          >
            <a
              className={`nav-link fs-6 ${selectedId !== "Home" ? "text-white" : ""}`}
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
                ? `bg-white`
                : `nav-item border my-2`
            }`}
          >
            <a
              className={`nav-link fs-6 ${selectedId !== "Watersports Management" ? "text-white" : ""}`}
             
              href="/WatersportsManagement"
              onClick={() => setSelectedId("Watersports Management")}
            >
              Watersports Management
            </a>
          </li>

          <li
            className={`${
              selectedId === "Watersports Reservations"
                ? `bg-white`
                : `nav-item border my-2`
            }`}
          >
            <a
              className={`nav-link fs-6 ${selectedId !== "Watersports Reservations" ? "text-white" : ""}`}
              
              href="/watersportReservations"
              onClick={() => setSelectedId("Watersports Reservations")}
            >
              Watersport Reservations
            </a>
          </li>

          <li
            className={`${
              selectedId === "Add a Watersport Reservation"
                ? `bg-white`
                : `nav-item border my-2`
            }`}
          >
            <a
              className={`nav-link fs-6 ${selectedId !== "Add a Watersport Reservation" ? "text-white" : ""}`}
              
              href="/selectActivity"
              onClick={() => setSelectedId("Add a Watersport Reservation")}
            >
              Add Watersport Reservations
            </a>
          </li>

          <li
            className={`${
              selectedId === "Dining Reservations"
                ? `bg-white`
                : `nav-item border my-2`
            }`}
          >
            <a
              className={`nav-link fs-6 ${selectedId !== "Dining Reservations" ? "text-white" : ""}`}
              
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
              backgroundColor: "",
              border: "2px solid white",
              color:"white",
              position: "relative",
              top: "150px",
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
