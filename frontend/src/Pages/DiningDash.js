import React, { useState, useEffect } from "react";
import { useLogout } from "../hooks/Client/userLogin/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DiningDash() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [hoveredElement, setHoveredElement] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  // Function to handle setting the category name
  const handleViewProducts = () => {
    setCategoryName('Srilankan');
    // Optionally, navigate to another view or trigger a fetch based on the category
    console.log('Category Set:', categoryName);
  };

  const location = useLocation();
  useEffect(() => {
    // Store the current location in localStorage
    localStorage.setItem("prevPath", location.pathname);
  }, [location.pathname]);
  console.log(location.pathname);

  const HandleButtonClick = () => {
    const token = localStorage.getItem("user");
    console.log(token);

    if (!token) {
      // Redirect to login page if token is missing
      navigate("/Login");
      return;
    }

    navigate("/test");
  };

  return (
    <div className="Dining vh-150">
      <h1>Dining</h1>
      {/* Pictures changing  */}
      <div className="container d-flex justify-content-center mt-3 vh-75">
        <div
          id="imageCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="banner2 (2).jpg"
                className="d-block w-75 mx-auto"
                alt="Image 1"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                src="banner4.jpg"
                className="d-block w-75 mx-auto"
                alt="Image 2"
              ></img>
            </div>
            {/* Add more carousel items with additional images  */}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <br></br>
      <h2 className="card-title text-center mb-5">Food Categories </h2>

      <div class="container ">
        <div class="row g-1">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="srilankan.jpg" class="card-img-top" alt="Sri Lankan Food"></img>
              <div class="card-body">
                <h5 class="card-title">Sri Lankan</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="burger1.jpg" class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Burgers & Sandwiches</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="chinese.jpg" class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Chinese</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="cakes.jpg" class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Cakes</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="Pizzaedit.jpg" class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Pizzas & Pasta</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <div class="card ">
              <img src="desserts.jpg" class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Desserts</h5>
                <a href="/displaymenu" class="btn btn-primary">
                  View Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiningDash;
