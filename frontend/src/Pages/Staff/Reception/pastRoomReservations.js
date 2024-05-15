import React, { useState } from "react";
import ReceptionNavbar from "../../../components/receptionNavbar";
import RoomReservationNavbar from "../../../components/roomReservationNavBar";
import usePastReservation from "../../../hooks/Staff/Reception/usePastRoomReservations";

function PastRoomBookings() {
  const { roomReservations = [], isLoading, error } = usePastReservation();

  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Splits the ISO string on 'T' and returns only the date part
  };

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

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-lg-2">
        <ReceptionNavbar />
      </div>
      <div className="col-lg-10">
        <RoomReservationNavbar />
        <div>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Customer Name"
            className="form-control m-3 border-primary"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "15rem" }}
          />
        </div>
        <h2 className="my-5">Past Room Reservations</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr className="border border-black">
                <th className="border border-black">Check-in</th>
                <th className="border border-black">Check-out</th>
                <th className="border border-black">No.of.Guests</th>
                <th className="border border-black">Room Type</th>
                <th className="border border-black">No.of.Rooms</th>
                <th className="border border-black">Room Numbers</th>
                <th className="border border-black">First Name</th>
                <th className="border border-black">Last Name</th>
                <th className="border border-black">Email</th>
                <th className="border border-black">Address</th>
                <th className="border border-black">Contact No</th>
                <th className="border border-black">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {roomReservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td className="border border-black">
                    {formatDate(reservation.Checkindate)}
                  </td>
                  <td className="border border-black">
                    {formatDate(reservation.Checkoutdate)}
                  </td>
                  <td className="border border-black">
                    {reservation.NoOfGuests}
                  </td>
                  <td className="border border-black">{reservation.Rtype}</td>
                  <td className="border border-black">
                    {reservation.noofRooms}
                  </td>
                  <td className="border border-black">
                    {reservation.RoomNumbers}
                  </td>
                  <td className="border border-black">
                    {reservation.firstName}
                  </td>
                  <td className="border border-black">
                    {reservation.lastName}
                  </td>
                  <td className="border border-black">{reservation.Email}</td>
                  <td className="border border-black">{reservation.Address}</td>
                  <td className="border border-black">{reservation.phoneno}</td>
                  <td className="border border-black">
                    {reservation.TotalPrice}
                  </td>
                  <td className="border border-black"></td>
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
