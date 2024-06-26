import React, { useState } from "react";
import RoomSideBar from "../../../components/RoomSideBar";
import RoomReservationList from "../../../hooks/Client/roomBooking/useRoomReservationList";

function Bookings() {
  const { roomReservations = [], isLoading, error } = RoomReservationList(); // Ensure default to []

  if (isLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row">
      <RoomSideBar />
      <div className="col">
      <h2>Bookings</h2>
      <div className="card">
        <table className="table col p-0 m-0">
          <thead>
            <tr>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>No.of.Guests</th>
              <th>Room Type</th>
              {/* <th>No.of.Rooms</th> */}
              <th>Room Numbers</th>
              <th>First Name</th>
              {/* <th>Last Name</th> */}
              <th>Email</th>
              {/* <th>Address</th> */}
              <th>Contact No</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {roomReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.Checkindate}</td>
                <td>{reservation.Checkoutdate}</td>
                <td>{reservation.NoOfGuests}</td>
                <td>{reservation.Rtype}</td>
                <td>{reservation.noofRooms}</td>
                <td>{reservation.RoomNumbers}</td>
                <td>{reservation.firstName}</td>
                <td>{reservation.lastName}</td>
                <td>{reservation.Email}</td>
                <td>{reservation.Address}</td>
                <td>{reservation.phoneno}</td>
                <td>{reservation.TotalPrice}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Bookings;
