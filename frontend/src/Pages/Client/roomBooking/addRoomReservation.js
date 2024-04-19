import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import RoomTypeList from "../../../hooks/Client/roomBooking/useRoomTypeList";
import RoomReservationList from "../../../hooks/Client/roomBooking/useRoomReservationList";

const AddRoomReserve = () => {
  const [Checkindate, setCheckindate] = useState("");
  const [Checkoutdate, setCheckoutdate] = useState("");
  const [NoOfGuests, setNoOfGuests] = useState("");

  const { roomTypes } = RoomTypeList();
  const { roomReservations } = RoomReservationList(); // Corrected this line
  console.log(roomReservations); // Now this should log the expected data

  const navigate = useNavigate();

  const bufferToBase64 = (buf) => {
    return btoa(
      new Uint8Array(buf).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  };

  const checkAvailability = (roomId) => {
    const format = (dateStr) => new Date(dateStr).getTime();
    const selectedCheckIn = format(Checkindate);
    const selectedCheckOut = format(Checkoutdate);

    const isAvailable = roomReservations.every((reservation) => {
      if (reservation.roomId !== roomId) return true; // Skip other rooms
      const reservationStart = format(reservation.checkInDate);
      const reservationEnd = format(reservation.checkOutDate);

      return selectedCheckOut <= reservationStart || selectedCheckIn >= reservationEnd;
    });

    if (isAvailable) {
      navigate('/CustomerDetails', {
        state: {
          Checkindate,
          Checkoutdate,
          NoOfGuests,
          Rid: roomId,
          price: roomTypes.price,
          roomType: roomTypes.Rtype
        }
      });
    } else {
      alert("Room is not available!");
    }
  };

  return (
    <div>
      <div className="row mt-4 d-flex">
        <div className="col-2 ms-5 me-3 ">
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
                  onChange={(e) => setCheckindate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />

                <label htmlFor="checkoutdate">Check-out Date:</label>
                <input
                  type="date"
                  id="checkoutdate"
                  value={Checkoutdate}
                  onChange={(e) => setCheckoutdate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />

                <label htmlFor="NoOfGuests">Number of Guests:</label>
                <input
                  type="number"
                  id="NoOfGuests"
                  value={NoOfGuests}
                  onChange={(e) => setNoOfGuests(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-9 ">
          {roomTypes.map((roomtype) => (
            <div key={roomtype._id}>
              <table>
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
                    <td rowSpan={5}>
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
                      <button className="btn btn-primary"  onClick={() => checkAvailability(roomtype._id)}>Search Room</button>
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
