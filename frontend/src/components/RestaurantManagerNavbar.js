import React, { useState } from "react";

import { useLogout } from "../hooks/Client/userLogin/useLogout";

function RestaurantNavbar() {
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
    <div className="col-2 pe-2">
      <ul className="nav flex-column vh-100 position-fixed " style={{ backgroundColor: "#1E3A8A" }}>
        <div className="d-flex flex-column  mt-5 justify-content-around fs-5"
          >
            <div className="d-flex justify-content-center align-items-center">
          <img
            src="Sunset Araliya horizontal.png"
            style={{ width: "150px" }}
            className="mt-4 d-flex justify-content-center align-items-center"
          ></img></div>
        </div>
        <div
          className="d-flex flex-column  mt-5 justify-content-around fs-5 p-1"
          style={{ height: "250px" }}
        >
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/menu"
            >
              Update Menu
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/manageTables"
            >
              Manage Table Reservations
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/manageOrders"
            >
              Manage Food Orders
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/manageBuffet"
            >
              Manage Buffet
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

export default RestaurantNavbar;
