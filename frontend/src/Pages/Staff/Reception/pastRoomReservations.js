import React, { useState } from "react";
import ReceptionNavbar from "../../../components/receptionNavbar";
import RoomReservationNavbar from "../../../components/roomReservationNavBar";
import usePastReservation from "../../../hooks/Staff/Reception/usePastRoomReservations";

function PastRoomBookings() {
  const { roomReservations = [], isLoading, error } = usePastReservation();

  if (isLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {}</div>;
  }

  return (
    <div className="row">
      <div className="col-lg-2">
        <ReceptionNavbar />
      </div>
      <div className="col-lg-10">
      <RoomReservationNavbar />
        <h2 className="my-5">Past Room Reservations</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>No.of.Guests</th>
                <th>Room Type</th>
                <th>No.of.Rooms</th>
                <th>Room Numbers</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Total Price</th>
                <th>Actions</th>
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

export default PastRoomBookings;
