import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAddRoomReserve from "../../../hooks/Client/roomBooking/useAddRoomReserve";
import { useAuthContext } from "../../../hooks/useAuthContext";

function ReservationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    Checkindate,
    Checkoutdate,
    NoOfGuests,
    Rtype,
    RoomNumbers,
    price,
    noOfRooms,
  } = location.state;
  const { user } = useAuthContext();
  const { addRoomReserve } = useAddRoomReserve();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [Email, setEmail] = useState("");

  useState(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleNext = () => {
    // Pass data to rooms page
    navigate("/Addpayment", {
      state: {
        Checkindate,
        Checkoutdate,
        NoOfGuests,
        Rtype,
        firstName,
        lastName,
        Email,
        Address,
        phoneno,
        RoomNumbers,
        price,
        noOfRooms
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("katha.jpg")',
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "800px",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Reservation Details</h1>

          <p>Room Type: {Rtype}</p>
          <p>Room Numbers: {RoomNumbers.join(', ')}</p>
          <p>Number of Rooms: {noOfRooms}</p>
          <p>Check-in Date: {Checkindate}</p>
          <p>Check-out Date: {Checkoutdate}</p>
          <p>Number of Guests: {NoOfGuests}</p>
          <p>Price per Night: {price}</p>
        </div>
        <h1>Enter Customer Details</h1>
        <form
          onSubmit={handleNext}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
         

          <label style={{ marginBottom: "10px" }}>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
              }}
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
              }}
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Email:
            <input
              type="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
              }}
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Address:
            <input
              type="text"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
              }}
            />
          </label>
          <label style={{ marginBottom: "10px" }}>
            Phone Number:
            <input
              type="tel"
              value={phoneno}
              onChange={(e) => setphoneno(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              width: "100%",
            }}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationDetails;
