import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import useAddRoomReserve from "../hooks/useAddRoomReserve";

const AddNewRoomReserve = () => {
  const [Checkindate, setCheckindate] = useState("");
  const [Checkoutdate, setCheckoutdate] = useState("");
  const [NoOfGuests, setNoOfGuests] = useState("");



  const navigate = useNavigate();

  const handleNext = () => {
    // Pass data to rooms page
    navigate('/rooms', {
      state: {
        Checkindate,
        Checkoutdate,
        NoOfGuests
      }
    });
  };

  return (
    <div className="background vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url("katha.jpg")' }}>
      <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", width: "400px", textAlign: "center" }}>

        <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Check-in Date:
          </label>
          <input type="date"
            className=""
            id="checkindate"
            onChange={(e) => {
              setCheckindate(e.target.value);
            }} min={new Date().toISOString().split('T')[0]} />

          <label>
            Check-out Date:
          </label>
          <input type="date"
            className=""
            id="checkoutdate"
            onChange={(e) => {
              setCheckoutdate(e.target.value);
            }} min={new Date().toISOString().split('T')[0]} />


          <label>
            Number of Guests:
          </label>
          <input type="number"
            className=""
            id="NoOfGuests"
            onChange={(e) => {
              setNoOfGuests(e.target.value);
            }} />

          <button
            type="submit"
            className="btn btn-info"
            id="submit"
            style={{
              backgroundColor: "#17a2b8",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              marginTop: "20px", // Adjust margin as needed
            }}
          >
            Next
          </button>


          <p id="Error"></p>
        </form>

      </div>
    </div>

  )
}

export default AddNewRoomReserve;
