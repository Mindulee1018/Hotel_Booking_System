import React, { useState } from 'react';
import RoomSideBar from '../../../components/RoomSideBar';
import RoomReservationList from '../../../hooks/Client/roomBooking/useRoomReservationList';
import useCheckoutRoomReserv from '../../../hooks/Staff/Reception/useCheckoutRoomReserv';
import useAddNotification from '../../../hooks/Staff/useAddNotification';
import useFetchUserEmails from '../../../hooks/Staff/useFetchUserEmails';

function Bookings() {
  const { roomReservations = [], isLoading, error } = RoomReservationList();  // Ensure default to []
  const { handleCheckOut } = useCheckoutRoomReserv();
  const { addNotification, isLoading: isNotifLoading, error: notifError } = useAddNotification();
  const { userEmails = [], loading: userEmailsLoading, error: userEmailsError } = useFetchUserEmails(); 
  console.log(userEmails);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [activeReservation, setActiveReservation] = useState(null);

  const handleCheckoutAndNotify = async () => {
    if (activeReservation) {
      await handleCheckOut(activeReservation._id);
      await addNotification(selectedEmail || activeReservation.Email, activeReservation.RoomNumbers);
      setSelectedEmail("");
      setActiveReservation(null);
    }
  };

  if (isLoading || isNotifLoading || userEmailsLoading) {
    return <div className="alert alert-primary" role="alert">Loading...</div>;
  }

  if (error || notifError || userEmailsError) {
    return <div>Error: {error || notifError || userEmailsError}</div>;
  }

  return (
    <div>
      <RoomSideBar />
      <h2>Bookings</h2>
      <div className="card">
        <table className="table col p-0 m-0">
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
                <td>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal"
                    onClick={() => setActiveReservation(reservation)}
                  >
                    Check Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        {/* Ensure Modal only renders if there is an active reservation */}
        {/* {activeReservation && ( */}
          <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">CONFIRMATION</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to checkout this reservation?
                  <select className="form-select mt-3" value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
                    <option value="">Select Email (optional)</option>
                    {userEmails.map((email, index) => (
                      <option key={index} value={email}>{email}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-outline-danger" onClick={handleCheckoutAndNotify} data-bs-dismiss="modal">Check out</button>
                </div>
              </div>
            </div>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Bookings;
