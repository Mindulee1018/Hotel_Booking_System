import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import RoomTypeList from "../../../hooks/Client/roomBooking/useRoomTypeList";
import RoomReservationList from "../../../hooks/Client/roomBooking/useRoomReservationList";

import { checkRoomAvailability } from "../../../hooks/Client/roomBooking/checkRoomAvailability";
import { useLocation } from "react-router-dom";

const AddRoomReserve = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); // months are 0-indexed
    const day = `0${d.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const today = formatDate(new Date());

  const [Checkindate, setCheckindate] = useState("");
  const [Checkoutdate, setCheckoutdate] = useState("");
  const [NoOfGuests, setNoOfGuests] = useState("");
  const [noOfRooms, setnoOfRooms] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);

  const { roomTypes } = RoomTypeList();
  const { roomReservations } = RoomReservationList();

  const bufferToBase64 = (buf) => {
    return btoa(
      new Uint8Array(buf).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  };

  const checkAvailability = async (Rtype) => {
    if (Checkindate && Checkoutdate && selectedRoomType) {
      const response = await checkRoomAvailability(
        Checkindate,
        Checkoutdate,
        Rtype
      );
      console.log(response, "checkavailability");
      if (response) {
        setAvailableRooms(response);
      } else {
        setAvailableRooms([]);
        alert("No rooms available for the selected dates and room type.");
      }
    } else {
      alert(
        "Please make sure to select check-in and check-out dates and a room type."
      );
    }
  };

  const assignRoomNumbers = (noOfRooms) => {
    if (availableRooms.length >= noOfRooms) {
      const assignedRooms = availableRooms.slice(0, noOfRooms);
      return assignedRooms;
    } else {
      // Not enough rooms available, handle this case appropriately
      alert("Not enough rooms available to fulfill the reservation request.");
      return [];
    }
  };

  const handleBookNow = (Rtype, price, noOfRooms) => {
    // Validate check-in date should be less than check-out date
    if (new Date(Checkindate) >= new Date(Checkoutdate)) {
      alert("Check-out date should be after check-in date.");
      return;
    }

    // Validate number of guests is positive
    if (NoOfGuests <= 0 || isNaN(NoOfGuests)) {
      alert("Number of guests must be a positive number.");
      return;
    }

    // Validate number of rooms is positive
    if (noOfRooms <= 0 || isNaN(noOfRooms)) {
      alert("Number of rooms must be a positive number.");
      return;
    }

    const assignedRoomNumbers = assignRoomNumbers(noOfRooms);

    if (assignedRoomNumbers.length == noOfRooms) {
      const totalPrice = price * noOfRooms;

      localStorage.removeItem("prevPath");
      localStorage.setItem("prevPath", location.pathname);
      const token = localStorage.getItem("user");
      if (!token) {
        navigate("/login", {
          state: {
            Checkindate,
            Checkoutdate,
            NoOfGuests,
            Rtype,
            RoomNumbers: assignedRoomNumbers,
            price: totalPrice,
            noOfRooms,
          },
        });
      } else {
        console.log("Navigating to CustomerDetails");
        navigate("/CustomerDetails", {
          state: {
            Checkindate,
            Checkoutdate,
            NoOfGuests,
            Rtype,
            noOfRooms,
            RoomNumbers: assignedRoomNumbers,
            price: totalPrice,
          },
        });
      }
    } else {
      alert("No available rooms to book. Please check availability first.");
    }
  };

  return (
    <div>
      <div className="row mt-4 ms-3 mb-5 d-flex">
        <div className="col-3">
          <div
            className="card"
            style={{
              position: "fixed",
              width: "280px",
              overflow: "auto",

              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              textAlign: "center",
            }}
          >
            <div className="card-body">
              <form style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="checkindate">Check-in Date:</label>
                <input
                  type="date"
                  id="checkindate"
                  value={Checkindate}
                  onChange={(e) => setCheckindate(formatDate(e.target.value))}
                  min={today}
                />

                <label htmlFor="checkoutdate">Check-out Date:</label>
                <input
                  type="date"
                  id="checkoutdate"
                  value={Checkoutdate}
                  onChange={(e) => setCheckoutdate(formatDate(e.target.value))}
                  min={today}
                />

                <label htmlFor="NoOfGuests">Number of Guests:</label>
                <input
                  type="number"
                  id="NoOfGuests"
                  value={NoOfGuests}
                  onChange={(e) => setNoOfGuests(e.target.value)}
                />

                <label htmlFor="noOfRooms">No of Rooms:</label>
                <input
                  type="number"
                  id="noOfRooms"
                  value={noOfRooms}
                  onChange={(e) => setnoOfRooms(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="col-9 ">
          {roomTypes.map((roomtype) => (
            <div
              key={roomtype._id}
              onClick={() => setSelectedRoomType(roomtype.Rtype)}
            >
              <table className="mt-3 mb-5">
                <tbody style={{ width: "100%" }}>
                  <tr>
                    <td colSpan={2}>
                      <h1 className="text-start">{roomtype.Rtype}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <p className="text-start">{roomtype.description}</p>
                    </td>
                  </tr>

                  <tr>
                    <td rowSpan={6}>
                      {roomtype.Image && roomtype.Image.data && (
                        <img
                          style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover",
                          }}
                          src={`data:${
                            roomtype.Image.contentType
                          };base64,${bufferToBase64(roomtype.Image.data.data)}`}
                          alt={roomtype.Rtype}
                        />
                      )}
                    </td>

                    <td className="text-start ps-5">
                      No.of.Beds : {roomtype.NoOfBeds}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start ps-5">
                      Room Capacity : {roomtype.capacity}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start ps-5">
                      Price per night : Rs.{roomtype.price}.00
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start ps-5">
                      ROOM FACILITIES
                      <ul>
                        <li>High Speed Internet</li>
                        <li>Wi Fi in all Rooms</li>
                        <li>Complimentary Drinking Wate</li>
                        <li>Daily Housekeeping</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {/* Button to check room availability */}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => checkAvailability(roomtype.Rtype)}
                        style={{ marginTop: "10px" }}
                      >
                        Check Room Availability
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        {availableRooms.length > 0 && (
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() =>
                              handleBookNow(
                                roomtype.Rtype,
                                roomtype.price,
                                noOfRooms
                              )
                            }
                          >
                            BOOK NOW
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddRoomReserve;
