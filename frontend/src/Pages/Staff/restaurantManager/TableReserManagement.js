import React, { useState } from "react";
import useDisplayTableList from "../../../hooks/Staff/restaurantManager/useDisplayTableResvList";
import useDeleteReservation from "../../../hooks/Staff/restaurantManager/useDeleteTableReservation";
import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";

const ManageTableReservation = () => {
  const { TableList, isLoading, error } = useDisplayTableList();
  const { deleteTableReservation } = useDeleteReservation();
  const [reservationIdToDelete, setReservationIdToDelete] = useState("");

  const handleDelete = async () => {
    await deleteTableReservation(reservationIdToDelete);
    setReservationIdToDelete("");
  };

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
    <div className="row p-0">
      <RestaurantNavbar />
      <div className="col">
        <h1 className="mb-4 mt-5">Manage Reservations</h1>
        <div className="d-flex align-items-center justify-content-around mb-3">
          <table className="table" style={{ width: "50rem" }}>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">TimeSlot</th>
                <th scope="col">Noofguests</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TableList.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.tableReservationNo}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.customerName}</td>
                  <td>{reservation.timeSlot}</td>
                  <td>{reservation.Noofguests}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.contactNumber}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                      onClick={() => setReservationIdToDelete(reservation._id)}
                    >
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Reservation Modal */}
        <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">CAUTION</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to cancel this reservation?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Cancel Reservation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTableReservation;
