import React, { useState } from "react";
import ReceptionNavbar from "../../../components/receptionNavbar";
import RoomReservationNavbar from "../../../components/roomReservationNavBar";
import RoomReservationList from "../../../hooks/Client/roomBooking/useRoomReservationList";
import useCheckoutRoomReserv from "../../../hooks/Staff/Reception/useCheckoutRoomReserv";
import useAddNotification from "../../../hooks/Staff/useAddNotification";
import useFetchUserEmails from "../../../hooks/Staff/useFetchUserEmails";

function RoomBookings() {
  const { roomReservations = [], isLoading, error } = RoomReservationList();
  const { handleCheckOut } = useCheckoutRoomReserv();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Splits the ISO string on 'T' and returns only the date part
  };

  const {
    addNotification,
    isLoading: isNotifLoading,
    error: notifError,
  } = useAddNotification();
  const {
    userEmails = [],
    loading: userEmailsLoading,
    error: userEmailsError,
  } = useFetchUserEmails();

  const [selectedEmail, setSelectedEmail] = useState("roommanager@gmail.com");
  const [selectedInventoryManagerEmail, setSelectedInventoryManagerEmail] =
    useState("inventorymanager@gmail.com");

  const [Message, setMessage] = useState("Ready for cleaning purpose.");
  const [inventoryMessage, setInventoryMessage] = useState(
    "Please restock the room items."
  );

  const [activeReservation, setActiveReservation] = useState(null);

  const handleCheckoutAndNotify = async () => {
    if (activeReservation) {
      await handleCheckOut(activeReservation._id);
      await addNotification(
        selectedEmail || activeReservation.Email,
        activeReservation.RoomNumbers,
        Message
      );
      if (selectedInventoryManagerEmail) {
        await addNotification(
          selectedInventoryManagerEmail,
          activeReservation.RoomNumbers,
          inventoryMessage
        );
      }
      setMessage("");
      setInventoryMessage("");
      setSelectedEmail("");
      setSelectedInventoryManagerEmail("");
      setActiveReservation(null);
    }
  };

  if (isLoading || isNotifLoading || userEmailsLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error || notifError || userEmailsError) {
    return <div>Error: {error || notifError || userEmailsError}</div>;
  }

  return (
    <div className="row">
      <div className="col-lg-2">
        <ReceptionNavbar />
      </div>
      <div className="col-lg-10">
        <RoomReservationNavbar />
        <h2 className="my-5">Room Reservations</h2>
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Check-in-Date Check-out-Date</th>

                <th>No.of Guests</th>
                <th>Room Type</th>
                <th>No.of Rooms</th>
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
                  <td>
                    <p>{formatDate(reservation.Checkindate)}</p>
                    <p>{formatDate(reservation.Checkoutdate)}</p>
                  </td>
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
          <div
            className="modal fade"
            id="Modal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    CONFIRMATION
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-start fw-bold">
                    Are you sure you want to checkout this reservation?
                  </p>

                  <p>Inform Room Manager</p>
                  <select
                    className="form-select"
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                  >
                    <option value="">Select Email (optional)</option>
                    {userEmails.map((email, index) => (
                      <option key={index} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>

                  {/* <p>Type a message:</p> */}
                  <textarea
                    className="form-control mt-3"
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <p className="mt-3">Inform Inventory Manager</p>
                  <select
                    className="form-select "
                    value={selectedInventoryManagerEmail}
                    onChange={(e) =>
                      setSelectedInventoryManagerEmail(e.target.value)
                    }
                  >
                    <option value="">Select Manager Email (optional)</option>
                    {userEmails.map((email, index) => (
                      <option key={index} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>

                  <textarea
                    className="form-control mt-3"
                    value={inventoryMessage}
                    onChange={(e) => setInventoryMessage(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleCheckoutAndNotify}
                    data-bs-dismiss="modal"
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomBookings;
