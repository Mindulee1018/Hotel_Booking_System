import React, { useState, useEffect } from "react";

import usePastReservation from "../../../hooks/usePastWatersportReserv";
import ReceptionNavbar from "../../../components/receptionNavbar";
import ReservationNavbar from "../../../components/reservationNavBar";

function PastWatersportReservations() {
  const { reservationList, isLoading, error } = usePastReservation();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter reservations on the fly
  const filteredReservations = reservationList.filter((reservation) =>
    reservation.CusName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

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

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="row">
      <ReceptionNavbar />
      <div className="col">
        <ReservationNavbar />
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
        <div className="col">
          <div>
            <div>
              <h2>Reservations</h2>
              <div className="d-flex justify-content-around mb-3">
                <table
                  className="table table-dark table-striped"
                  style={{ width: "75rem" }}
                >
                  <thead>
                    <tr className="border border-black">
                      <td className="border border-black">Customer Name</td>
                      <td className="border border-black">Contact No</td>
                      <td className="border border-black">Address</td>
                      <td className="border border-black">CheckIn Date</td>
                      <td className="border border-black">CheckIn Time</td>
                      <td className="border border-black">Activities</td>
                      <td></td>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReservations.length > 0 ? (
                      filteredReservations.map((reservation) => (
                        <tr key={reservation._id}>
                          <td>{reservation.CusName}</td>
                          <td>{reservation.TelNo}</td>
                          <td>{reservation.Address}</td>
                          <td>{reservation.checkinDate}</td>
                          <td>{reservation.checkinTime}</td>
                          <td>
                            {reservation.activityList.map((activity, index) => (
                              <div key={index} className="text-start">
                                <div>Activity Name: {activity.id}</div>
                                <div>No. of People: {activity.Qty}</div>
                                <div>Number of Rides: {activity.noOfRides}</div>
                                <div>
                                  Price: Rs.{activity.activityTPrice}.00
                                </div>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No reservations found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastWatersportReservations;
