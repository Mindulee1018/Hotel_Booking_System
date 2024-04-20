import React, { useState, useEffect } from "react";

import usePastReservation from "../../../hooks/Staff/Reception/usePastWatersportReserv";
import ReceptionNavbar from "../../../components/receptionNavbar";
import ReservationNavbar from "../../../components/reservationNavBar";
import useDeleteReservation from "../../../hooks/Staff/Reception/useDeleteReservation";

function PastWatersportReservations() {
  const { reservationList, isLoading, error } = usePastReservation();
  const { deleteReservation } = useDeleteReservation();

  const [searchTerm, setSearchTerm] = useState("");

  const [nameToDelete, setNameToDelete] = useState("");

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

  const handleDelete = async () => {
    await deleteReservation(nameToDelete);

    setNameToDelete("");
  };

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
              <h2>Past Reservations</h2>
              <div className="d-flex justify-content-around mb-3">
                <table
                  className="table"
                  style={{ width: "75rem" }}
                >
                  <thead>
                    <tr className="border border-black">
                      <th className="border border-black">Customer Name</th>
                      <th className="border border-black">Contact No</th>
                      <th className="border border-black">Address</th>
                      <th className="border border-black">CheckIn Date</th>
                      <th className="border border-black">CheckIn Time</th>
                      <th className="border border-black">Activities</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredReservations.length > 0 ? (
                      filteredReservations.map((reservation) => (
                        <tr key={reservation._id}>
                          <td className="border border-black">{reservation.CusName}</td>
                          <td className="border border-black">{reservation.TelNo}</td>
                          <td className="border border-black">{reservation.Address}</td>
                          <td className="border border-black">{reservation.checkinDate}</td>
                          <td className="border border-black">{reservation.checkinTime}</td>
                          <td className="border border-black">
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
                          <td className="border border-black"><button
                                  className="btn btn-outline-danger "
                                  style={{ width: "10rem" }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#Modal"
                                  onClick={() =>
                                    setNameToDelete(reservation._id)
                                  }
                                >
                                  Delete Reservation
                                </button></td>
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

              {/* model  */}
            <div
              className="modal fade"
              id="Modal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      CAUTION
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to delete this Reservation?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <form action="" method="delete">
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastWatersportReservations;
