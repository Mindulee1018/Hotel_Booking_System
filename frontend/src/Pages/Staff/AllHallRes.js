import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HallAdminsidebar from '../../components/HallAdminSidebar';

const AdminBookHall = () => {
  const [hallReserves, setHallReserves] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reservationIdToDelete, setReservationIdToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:4000/hallR/hallres');
      if (!response.ok) {
        throw new Error('Failed to fetch hall bookings');
      }
      const data = await response.json();
      setHallReserves(data.data);
    } catch (error) {
      console.error('Error fetching hall bookings:', error.message);
    }
  };

  const handleDelete = async (id) => {
    setReservationIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/hallR/hallres/${reservationIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete hall booking');
      }
      // If deletion is successful, refetch the bookings to update the UI
      fetchBookings();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting hall booking:', error.message);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const filteredReservations = hallReserves
    ? hallReserves.filter((reservation) => {
        const dateMatch = !selectedDate || reservation.selectdate === selectedDate;
        const emailMatch = !selectedEmail || reservation.email === selectedEmail;
        return dateMatch && emailMatch;
      })
    : [];

  return (
    <div className='row'>

      <HallAdminsidebar />
      
      <div className="container mt-5 col-md-9">
        <div className="mb-4">
          <h1 className="fw-bold display-4 serif">All user Reservations</h1>
          <input
            type="date"
            className="form-control mb-2"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <input
            type="text"
            className="form-control mb-4"
            placeholder="search by email"
            value={selectedEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Name</th>
                <th scope="col">Hall</th>
                <th scope="col">Event Type</th>
                <th scope="col">Capacity</th>
                <th scope="col">Selected Date</th>
                <th scope="col">Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((hallReserve) => (
                  <tr key={hallReserve._id}>
                    <td>{hallReserve.email}</td>
                    <td>{hallReserve.hall}</td>
                    <td>{hallReserve.hallid}</td>
                    <td>{hallReserve.eventtype}</td>
                    <td>{hallReserve.capacity}</td>
                    <td>{hallReserve.selectdate}</td>
                    <td>{hallReserve.fromTime}-{hallReserve.toTime}</td>
                    <td>
                   
                      <Link to={`/bookingdata/${hallReserve._id}`} className="btn btn-primary me-2">View</Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(hallReserve._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#confirmationModal"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No matching reservations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Confirmation Modal */}
      <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmationModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this reservation?this process cannot be undone
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookHall;
