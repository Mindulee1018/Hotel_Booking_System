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

<style>
{`
  .header {
    background-color: #003f5c;
    color: white;
    display: flex;
    justify-content: center;
    position: relative;
  }
  
  .headerContainer {
    width: 100%;
    max-width: 1024px;
    margin: 20px 0px 100px 0px;
  }
  
  .headerContainer.listMode {
    margin: 20px 0px 0px 0px;
  }
  
  .headerList {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
  }
  
  .headerListItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .headerListItem.active {
    border: 1px solid white;
    padding: 10px;
    border-radius: 20px;
  }
  
  .headerDesc {
    margin: 20px 0px;
  }
  
  .headerBtn {
    background-color: #0071c2;
    color: white;
    font-weight: 500;
    border-radius: 0.5rem;
    padding: 10px;
    cursor: pointer;
  }
  
  .headerSearch {
    height: 5rem;
    background-color: white;
    border: 3px solid #003f5c;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0px;
    border-radius: 3rem;
    position: absolute;
    bottom: -25px;
    width: 100%;
    max-width: 1024px;
    
  }
  
  .headerIcon {
    color: lightgray;
  }
  
  .headerSearchItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .headerSearchInput {
    border: none;
    outline: none;
  
      
  }
  
  .headerSearchText {
    color: lightgray;
    cursor: pointer;
  }
  
  .date {
    position: absolute;
    top: 50px;
    z-index: 2;
  }
  
  .options {
    z-index: 2;
    position: absolute;
    top: 50px;
    background-color: white;
    color: gray;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  }
  
  .optionItem {
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
  
  .optionCounter {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: black;
  }
  
  .optionCounterButton {
    width: 30px;
    height: 30px;
    border: 1px solid #0071c2;
    color: #0071c2;
    cursor: pointer;
    background-color: white;
  }
  
  .optionCounterButton:disabled {
    cursor: not-allowed;
  }
  .navbar{
 
  height: 50px;
  background-color: #003f5c;
  display: flex;
  justify-content: center;
}

.navContainer{
  width: 100%;
  max-width: 1024px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo{
  font-weight: 500;
}

.navButton{
  margin-left: 20px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  color: #003580;
};
       
      
      .navContainer{
        width: 100%;
        max-width: 1024px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .logo{
        font-weight: 500;
      }
      
      .navButton{
        margin-left: 20px;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        color: #003580;
      }

    .text-light-blue {
      color: #1e2d54; /* Light blue color */
    }
    .card {
      border-color: white; /* Set border color to white */
    }
    .serif {
      font-family: serif; /* Apply serif font family */
    }
    .hover-bg-light-blue:hover {
      background-color: #eef2fc; /* Baby blue color */
    }
    .btn-primary {
      background-color:#006cE4;
      border-color: none;
      color: white;
    }
    .btn-primary:hover {
      background-color:gray;
    }
    .btn-secondary {
      background-color: #87CEEB; /* Baby blue */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 50px; /* Round */
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.3s; /* Smooth transition */
    }
    .btn-secondary:hover {
      background-color: #4682B4; /* Darker shade of baby blue on hover */
    }
    .input-group-text {
      background-color: white; /* Lighter background color */
    }
    .input-group-text:hover {
      background-color: #bee1e6; /* Darker background color on hover */
    }
    .form-control {
      border-radius: 20px; /* Make input fields more rounded */
      background-color: white; /* Set background color to white */
      color: black; /* Set text color to black */
    }
    .form-control:hover {
      background-color: #e9ecef; /* Darken background color on hover */
    }
    .btn-save-changes {
      border-radius: 50px; /* Super round */
      font-size: 18px; /* Larger font size */
      padding: 12px 24px; /* Larger padding */
      background-color: #003f5c; /* Baby blue */
      color: white; /* Black text */
      transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effect */
    }
    .btn-save-changes:hover {
      background-color: black; /* Black on hover */
      color: #add8e6; /* Baby blue text on hover */
    }
    .textarea-input {
      background-color: white; /* Slightly darker white */
    }
    .textarea-input:hover {
      background-color: #e0e0e0; /* Lighter than hover */
    }
    .hall-image:hover {
      transform: scale(1.1);
    }
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
    }
    .bg-white {
      background-color: #ffffff; /* Set background color to white */
    }
    .bg-light {
      background-color: #f8f9fa; /* Set background color to a darker white */
    }
    @media (max-width: 576px) {
      .toast-container {
        top: 3rem;
        right: 1rem;
      }
    }
`}
</style>