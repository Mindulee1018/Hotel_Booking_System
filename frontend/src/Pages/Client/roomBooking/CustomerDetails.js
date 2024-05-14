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

  function generatereservationNumber(prefix = 'RR', numDigits = 8) {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, numDigits));
    const formattedNumber = String(randomNumber).padStart(numDigits, '0');
    return prefix + formattedNumber;
  }

  const roomreservationNo = generatereservationNumber();

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
        noOfRooms,
        roomreservationNo
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
        <h2>Reservation Details</h2>
        <div className="text-start ps-5 " style={{position:"relative" , left:"250px", width:"18vw"}}>

          <p>Room Type: <span className="fw-bold">{Rtype}</span></p>
          <p>Room Numbers: <span className="fw-bold">{RoomNumbers.join(", ")}</span></p>
          <p>Number of Rooms:<span className="fw-bold">{noOfRooms}</span> </p>
          <p className="pe-3">Check-in Date:<span className="fw-bold">{Checkindate}</span> </p>
          <p>Check-out Date: <span className="fw-bold">{Checkoutdate}</span></p>
          <p>Number of Guests:<span className="fw-bold">{NoOfGuests}</span> </p>
          <p>Total Price: <span className="fw-bold">Rs.{price}.00</span></p>
        </div>
        <h2>Enter Customer Details</h2>
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
          <label style={{ marginBottom: "10px" }}>
            Email:
            <input
              type="Email"
              readOnly
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "8px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                flex: "1",
                width:"24vw"
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
                width:"24vw"
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
