import React, { useState, useContext } from "react";
import {
  faBed,
  faCalendarDays,
  faHotel,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SearchHeader = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSearch = () => {
    navigate("/halls", { state: { destination, date, capacity } });
  };

  const handleReserveNow = () => {
    // Check if user is logged in
    if (!user) {
      // Show confirmation modal
      setShowConfirmationModal(true);
    }
    else{
      navigate("/bookHall")
    }
  };

  const confirmReservation = () => {
    // Close the modal
    setShowConfirmationModal(false);
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faHotel} />
            <span>Venues</span>
          </div>
         
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCopy} />
            <span>
              <button type="button" className="btn btn-primary bg-transparent border-0" onClick={handleReserveNow}>Reservations</button>
            </span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle serif">
              Looking to host an unforgettable event?🎉
            </h1>
            <p>
              Look no further! Our stunning halls are the perfect backdrop for
              your special day. With versatile spaces, state-of-the-art
              amenities, and exceptional service, we're here to turn your
              vision into reality.
            </p>
            <p>Book your event with us today and let's create memories that last a lifetime.</p>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <div className={`modal fade ${showConfirmationModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showConfirmationModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header">
           
              <button type="button" className="btn btn-primary bg-white text-dark border border-light font-weight-bold" >Login to view </button>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowConfirmationModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
           
            {/* Modal body */}
            <div className="modal-body">
            <button type="button" className="btn btn-primary bg-white text-dark border border-light m-0" >You are not logged in please log in to view your bookings </button>
           
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmReservation}>Log In</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add the styles here */}
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
    </div>
  );
};

export default SearchHeader;