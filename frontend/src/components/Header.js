import React, { useState } from "react";
import { useLogout } from "../hooks/Client/userLogin/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUpdate } from "../hooks/Client/userLogin/useUpdate";
import { useDelete } from "../hooks/Client/userLogin/useDelete";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const { Update, error, status, isLoading } = useUpdate();
  const { Deleteuser } = useDelete();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Update(password, newpassword);
  };

  const handledelete = async (e) => {
    e.preventDefault();
    await Deleteuser();
  };

  function resetfeilds() {
    var pwd = document.getElementById("Password1");
    var newpwd = document.getElementById("Password2");

    pwd.value = null;
    newpwd.value = null;
  }

  const handlelogout = () => {
    logout();
  };

  const handleTogglePwd = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleNewPwd = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4 fs-6">
              <li className="nav-item me-3">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item me-3">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/roomReservation"
                >
                  Accomadation
                </a>
              </li>

              <li className="nav-item me-3">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/DiningDashboard"
                >
                  Dining
                </a>
              </li>

              <li className="nav-item me-3">
                <a className="nav-link active" aria-current="page" href="/">
                  Events
                </a>
              </li>

              <li className="nav-item me-3">
                <a className="nav-link active" aria-current="page" href="/Watersports">
                  Watersports
                </a>
              </li>

              <li className="nav-item dropdown me-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Offers and Packages
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Offers
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Packages
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <img
              src="hotellogo.png"
              style={{ width: "170px", height: "70px" }}
              className="position-absolute top-50 start-50 translate-middle"
            ></img>

            {user && (
              <div>
                <a
                  data-bs-toggle="offcanvas"
                  href="#offcanvas"
                  role="button"
                  aria-controls="offcanvasExample"
                  class="btn btn-outline-primary ms-5 me-3 btn-sm"
                  style={{ position: "relative", top: "5px" }}
                >
                  Profile
                </a>
                <a
                  href=""
                  id="userStatus"
                  className="btn ms-4 mt-2 btn-sm"
                  style={{ backgroundColor: "rgb(85, 180, 254)" }}
                  onClick={handlelogout}
                >
                  Logout
                </a>
              </div>
            )}
            {!user && (
              <div>
                <a
                  href="/Login"
                  id="userStatus"
                  className="btn  ms-4 mt-2"
                  style={{ backgroundColor: "rgb(85, 180, 254)" }}
                >
                  Sign in
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
        data-bs-backdrop="static"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title" id="offcanvasLabel">
            Profile
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={resetfeilds}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="container w-100 h-100 bg-body-tertiary pt-4 ">
            {user && (
              <div>
                <h6>
                  Email<span class="ms-4">{user.email}</span>
                </h6>
              </div>
            )}
            <hr></hr>
            <div style={{ position: "relative", top: "23px" }}>
              <h5 className="ps-1">Reservations History</h5>
              <div
                type="submit"
                className="btn btn-danger btn-sm mt-3 mb-5"
                id="submit"
                data-bs-toggle="modal"
                data-bs-target="#Modal"
                style={{ backgroundColor: "rgb(85, 180, 254)" }}
              >
                View
              </div>
            </div>
            <hr></hr>
            <form onSubmit={handleSubmit} method="post" className="mt-4">
              <h5 className="mb-4 ps-1">Change Password</h5>
              <div className="row ps-2 ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  id="Password1"
                  name="Password1"
                  className="w-75 col-9"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <div className="btn col" onClick={handleTogglePwd}>
                  {showPassword ? "Hide" : "Show"}
                </div>
              </div>
              <br />
              <div className="row ps-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  id="Password2"
                  name="Password2"
                  className=" w-75 col-9"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                ></input>
                <div className="btn col" onClick={handleToggleNewPwd}>
                  {showNewPassword ? "Hide" : "Show"}
                </div>
              </div>

              <span id="pwdError" style={{ color: "red" }}></span>
              <button
                className="btn btn-outline-primary mt-4 btn-sm mb-2"
                name="submit"
                id="submit"
                disabled={isLoading}
              >
                Change
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
            </form>
            <hr></hr>

            <div style={{ position: "relative", top: "80px" }}>
              <div
                type="submit"
                className="btn btn-sm btn-danger mt-1"
                id="submit"
                data-bs-toggle="modal"
                data-bs-target="#Modal"
              >
                Delete My Account
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* model  */}
      <div
        className="modal fade"
        id="Modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are You Sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              This is Permenent. You can not recover account after deletion.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <form action="" onSubmit={handledelete} method="post">
                <button className="btn btn-outline-danger">DELETE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
