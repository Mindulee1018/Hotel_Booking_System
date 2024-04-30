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
import "./header.css";

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
            <FontAwesomeIcon icon={faCalendarDays} /> 
            <span>Calendar</span>
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
    </div>
  );
};

export default SearchHeader;
