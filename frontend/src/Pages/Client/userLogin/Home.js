import React, { useState, useEffect } from "react";
import { useLogout } from "../../../hooks/Client/userLogin/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Home() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseOver = (elementId) => {
    setHoveredElement(elementId);
  };

  const handleMouseOut = () => {
    setHoveredElement(null);
  };

  const handleZoomIn = (element) => {
    element.style.transform = "scale(1.1)";
  };

  const handleZoomOut = (element) => {
    element.style.transform = "scale(1)";
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
    <div className="container-fluid ">
      <div className="container d-flex justify-content-center" >
        <div
          id="imageCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="carouselImg1.jpg"
                className="d-block w-100 mx-auto"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                src="carouselImg2.jpg"
                className="d-block w-100 mx-auto"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                src="carouselImg3.jpg"
                className="d-block w-100 mx-auto"
              ></img>
            </div>
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

      <div className="booknow d-flex justify-content-center mt-4 w-100">
        <a
          href="/reservation"
          className="btn btn-outline-primary mb-5 mt-4 "
          
        >
          Book Now
        </a>
      </div>

      <div className="row mt-4">
        <div className="col d-flex justify-content-center align-items-center">
          <div
            className="card"
            style={{ width: "35vw" }}
            onMouseOver={(e) => {
              handleZoomIn(e.currentTarget.querySelector(".card-img"));
              handleMouseOver(1);
            }}
            onMouseOut={(e) => {
              handleZoomOut(e.currentTarget.querySelector(".card-img"));
              handleMouseOut();
            }}
          >
            <img
              src="Room.jpg"
              alt=""
              className="card-img"
              style={{ width: "100%", transition: "transform 0.3s" }}
            />

            <div className="card-img-overlay d-flex align-items-end">
              <div className="card-overlay-content text-light">
                
                <h3
                  className="card-title bg-dark bg-opacity-50 m-2 p-3"
                  
                >
                  COMFORTABLE
                </h3>
                {hoveredElement === 1 && (
                  <div className="bg-dark bg-opacity-75 py-3">
                    <p className="card-description fs-6 fw-bold">
                      "Discover your sanctuary away from home, where tranquility
                      meets modern convenience."
                    </p>
                    <a className="text-white fw-bold btn btn-outline-light mt-5">Explore</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="card ms-4"
            style={{ width: "35vw" }}
            onMouseOver={(e) => {
              handleZoomIn(e.currentTarget.querySelector(".card-img"));
              handleMouseOver(2);
            }}
            onMouseOut={(e) => {
              handleZoomOut(e.currentTarget.querySelector(".card-img"));
              handleMouseOut();
            }}
          >
            <img
              src="Hall.jpg"
              alt=""
              className="card-img"
              style={{ width: "100%", transition: "transform 0.3s" }}
            />

            <div className="card-img-overlay d-flex align-items-end">
              <div className="card-overlay-content text-light">
                <h3
                  className="card-title bg-dark bg-opacity-50 m-2 p-3"
                  
                >
                  ELEGANT
                </h3>
                {hoveredElement === 2 && (
                  <div className="bg-dark bg-opacity-75 py-3">
                    <p className="card-description  fs-6 fw-bold">
                      "Elevate your events to unforgettable heights, where every
                      occasion becomes a memory."
                    </p>
                    <a className="text-white fw-bold btn btn-outline-light mt-5">Explore</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center align-items-center mt-4">
          <div
            className="card"
            style={{ width: "35vw" }}
            onMouseOver={(e) => {
              handleZoomIn(e.currentTarget.querySelector(".card-img"));
              handleMouseOver(3);
            }}
            onMouseOut={(e) => {
              handleZoomOut(e.currentTarget.querySelector(".card-img"));
              handleMouseOut();
            }}
          >
            <img
              src="Restaurent.jpg"
              alt=""
              className="card-img"
              style={{ width: "100%", transition: "transform 0.3s" }}
            />

            <div className="card-img-overlay d-flex align-items-end">
              <div className="card-overlay-content text-light">
                <h3
                  className="card-title bg-dark bg-opacity-50 m-2 p-3"
                  
                >
                  UNMATCHED TASTE
                </h3>
                {hoveredElement === 3 && (
                  <div className="bg-dark bg-opacity-75 py-3 px-2">
                    <p className="card-description fs-6 fw-bold">
                      "Savor every moment with our culinary delights, where
                      every dish is a journey of flavors."
                    </p>
                    <a className="text-white fw-bold btn btn-outline-light mt-5">Explore</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="card ms-4"
            style={{ width: "35vw" }}
            onMouseOver={(e) => {
              handleZoomIn(e.currentTarget.querySelector(".card-img"));
              handleMouseOver(4);
            }}
            onMouseOut={(e) => {
              handleZoomOut(e.currentTarget.querySelector(".card-img"));
              handleMouseOut();
            }}
          >
            <img
              src="Watersport.jpg"
              alt=""
              className="card-img"
              style={{ width: "100%", transition: "transform 0.3s" }}
            />

            <div className="card-img-overlay d-flex align-items-end">
              <div className="card-overlay-content text-light">
                <h3
                  className="card-title bg-dark bg-opacity-50 m-2 p-3"
                 
                >
                  ENTERTAINMENT
                </h3>
                {hoveredElement === 4 && (
                  <div className="bg-dark bg-opacity-75 py-3 px-2">
                    <p className="card-description fs-6 fw-bold">
                      "Dive into adventure with watersports activities, where
                      every wave brings excitement."
                    </p>
                    <a className="text-white fw-bold btn btn-outline-light mt-5" href="/Watersports">
                      Explore
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center mb-5 mt-5 custom-font">
        Benifits you will always enjoy
      </h1>

      <div className="row mt-3 justify-content-around ">
        <div className="card" style={{ width: "11rem", height: "17rem" }}>
          <img src="Accomadation.png" className="card-img-top pt-3"></img>
          <div className="card-body">
            <h5 className="card-title text-center">Comfortable Rooms</h5>
          </div>
        </div>

        <div className="card" style={{ width: "11rem", height: "17rem" }}>
          <img src="Bestprice.png" className="card-img-top pt-3"></img>
          <div className="card-body">
            <h5 className="card-title text-center">Best Rate Guarantee</h5>
          </div>
        </div>

        <div className="card" style={{ width: "11rem", height: "17rem" }}>
          <img src="choice.png" className="card-img-top pt-3"></img>
          <div className="card-body">
            <h5 className="card-title text-center">Flexibility Choices</h5>
          </div>
        </div>

        <div className="card" style={{ width: "11rem", height: "17rem" }}>
          <img src="offer.png" className="card-img-top pt-3"></img>
          <div className="card-body">
            <h5 className="card-title text-center">
              Special Offers and Rewards
            </h5>
          </div>
        </div>
      </div>

      <div className="card text-bg-dark mt-5">
        <img
          src="Panorama.jpg"
          className="card-img"
          style={{ height: "50vh" }}
        ></img>
        <div className="card-img-overlay position-absolute top-50 start-50 translate-middle">
          <h4 className="card-text mb-5">
            "Experience comfort beyond measure, book your stay today!"
          </h4>
          <a
            href="/reservation"
            className="text-white fw-bold btn btn-outline-light mt-5"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
