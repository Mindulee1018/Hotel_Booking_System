import React, { useState } from "react";

import { useLogout } from "../hooks/Client/userLogin/useLogout";

function ActivityManagerSideBar() {
  const { logout } = useLogout();
  let selectedId = localStorage.getItem("selectedMenuId")
    ? localStorage.getItem("selectedMenuId")
    : "Home";

  const handlelogout = () => {
    logout();
  };

  const setSelectedId = (id) => {
    localStorage.setItem("selectedMenuId", id);
    console.log(id, "id");
  };

  return (
    <div className="col-2">
      <ul
        className="nav flex-column pe-1 vh-100 position-fixed"
        style={{ backgroundColor: "#1E3A8A" }}
      >
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
              className={`nav-link fs-6 ${
                selectedId !== "Home" ? "text-white" : ""
              }`}
              aria-current="page"
              href="/ActivityManagerDashboard"
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
              className={`nav-link fs-6 ${
                selectedId !== "Watersports Management" ? "text-white" : ""
              }`}
              href="/WatersportsManagement"
              onClick={() => setSelectedId("Watersports Management")}
            >
              Watersports Management
            </a>
          </li>
        </div>
      </ul>
      <div className="justify-content-center ">
        <a
          id="userStatus"
          className="btn mt-5  position-fixed"
          sty
          onClick={() => handlelogout()}
          style={{
            backgroundColor: "rgb(85, 180, 254)",

            top: "500px",
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
}

export default ActivityManagerSideBar;
