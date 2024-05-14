import React, { useEffect, useState,} from "react";
import { useParams ,Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons';


const ViewHall = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await fetch(`http://localhost:4000/hall/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hall");
        }
        const data = await response.json();
        setHall(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hall data:", error);
        setLoading(false);
      }
    };
    fetchHall();
  }, [id]); // Make sure to re-run the effect whenever the id changes

  const handleNext = ()=>{
    const token = localStorage.getItem('user');
    if (!token) {
      alert("You need to Login First")
      navigate('/login'); 
      return;
    }else{
      navigate('/availability')
    }

  }

  return (
    <div>
   
      <div className="container">
        <div className="mt-5 mb-4">
          <h1 className="fw-bold display-4 text-light-blue serif" style={{ fontSize: "2.5rem" }}>venue Details</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {/* Image Carousel */}
            <div className="col-md-6 mb-4">
              <div id="hallCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {hall.photos.map((photo, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={photo} className="d-block w-100 rounded hall-image" style={{ width: '600px', height: '399px', objectFit: 'cover', transition: 'transform 0.3s ease-in-out' }} alt={`Hall Photo ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#hallCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#hallCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            {/* Description, Price, Capacity Card */}
            <div className="col-md-6 mb-4 serif">
              <div className="card border-0 hall-info-card">
                <div className="card-body">
                  <h5 className="card-title fw-bold" style={{ fontSize: "2.5rem" }}>Description</h5>
                  <p className="card-text">{hall.description}</p>
                  <h5 className="card-title fw-bold" style={{ fontSize: "2.25rem" }}>Price</h5>
                  <p className="card-text">{hall.price} per Hour</p>
                  <h5 className="card-title mt-4 fw-bold" style={{ fontSize: "2.25rem" }}>Capacity</h5>
                  <p className="card-text">{hall.capacity}</p>
                </div>
              </div>
            </div>

            {/* Facilities Card */}
            <div className="col-md-6 mb-4 serif">
              <div className="card border-0 hall-info-card">
                <div className="card-body justify-content-center align-items-center " >
                  <h5 className="card-title fw-bold" style={{ fontSize: "2.25rem" }}>Facilities</h5>
                  <div className="d-flex align-items-center">
                    {/* Map through facilities and render each */}
                    {hall.facilities.map((facility, index) => (
                      <div key={index} className="me-4">
                        {/* Render facility icon and name */}
                        {facility === 'Free WiFi' && <FontAwesomeIcon icon={faWifi} className="fs-8 me-1 mr-6" />}
                        {facility === 'Al La Carte Menu' && <FontAwesomeIcon icon={faUtensils} className="fs-8 me-1 mr-3 " />}
                        {/* Add more conditions for other facilities */}
                        {/* Render facility name */}
                        <span className="fs-4">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Check Card */}
        <div className="card position-fixed bottom-0 end-0 m-3 serif" style={{ maxWidth: '300px' }}>
          <div className="card-body">
            <h5 className="card-title">Check Availability</h5>
            <p className="card-text">Click here to check availability for your dates</p>
            <a onClick={() =>handleNext()} className="btn btn-secondary">Check Availability</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHall;
