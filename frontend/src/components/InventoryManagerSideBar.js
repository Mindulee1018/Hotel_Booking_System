
import React, { useState } from "react";

import { useLogout } from "../hooks/Client/userLogin/useLogout";
import { useUpdate } from "../hooks/Client/userLogin/useUpdate";
import { useAuthContext } from "../hooks/useAuthContext";
import useNotifications from "../hooks/Staff/useReadNotifications";

function InventorySideBar() {
  const { Update, error, status, isLoading } = useUpdate();
  const { logout } = useLogout();
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const { user } = useAuthContext();

  const { Notifications } = useNotifications();

  const filterEmail = "roommanager@gmail.com";
  const filteredNotifications = Notifications?.filter(
    (notif) => notif.email === filterEmail
  );

  const handlelogout = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Update(password, newpassword);
  };

  function resetfeilds() {
    var pwd = document.getElementById("Password1");
    var newpwd = document.getElementById("Password2");

    pwd.value = null;
    newpwd.value = null;
  }
  return (
    <div className="col-2 m-0 p-0 vh-100" >
      <ul
        className="nav flex-column pe-1 vh-100 position-fixed"
        style={{ backgroundColor: "#1E3A8A" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="Sunset Araliya horizontal.png"
            style={{ width: "150px" }}
            className="mt-4 "
          ></img>
        </div>
        <div
          className="d-flex flex-column  mt-5 justify-content-around fs-5"
          style={{ height: "250px" }}
        >
          <li>
            <a
              type="button"
              className="btn btn-primary position-relative"
              href="/AlertNotifications"
            >
              Notifications
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {filteredNotifications.length > 99 ? "99+" : filteredNotifications.length}
                <span class="visually-hidden">unread messages</span>
              </span>
            </a>
          </li>
          {/*<li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/HotelView"
            >
              Hotel View
            </a>
          </li>*/}
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/RoomManagerView"
            >
              Room Manager View
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/AddItem"
            >
              Add Items
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/EditItem"
            >
              Edit Item
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/Inventory_report"
            >
              Generate Report
            </a>
          </li>
          <li className="nav-item border">
            <a
              className="nav-link text-white fs-6"
              aria-current="page"
              href="/RoomRestock"
            >
              Restock Items
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

      <div
        className="modal fade"
        id="Modal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Admin Profile
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={resetfeilds}
                ></button>
              </div>
              {user && (
                <div>
                  <h6>
                    Email:<span class="ms-1">{user.email}</span>
                  </h6>
                </div>
              )}
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password1"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    New Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Password2"
                    placeholder="Enter New password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Update
                </button>
                {error && (
                  <div
                    className="error bg-danger my-2"
                    style={{ color: "white" }}
                  >
                    {error}
                  </div>
                )}
                {status && (
                  <div
                    className="error bg-primary my-2"
                    style={{ color: "white" }}
                  >
                    {status}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InventorySideBar;
