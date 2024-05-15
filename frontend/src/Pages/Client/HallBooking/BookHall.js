//BookHall.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Header from '../../../components/Header';
import SearchHeader from '../../../components/SearchHeader';


const BookHall = () => {
  const [hallReserves, setHallReserves] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:4000/hallR/hallresbyemail/${user.email}`);
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
    setDeleteId(id); // Set the delete ID to trigger the modal
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/hallR/hallres/${deleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete hall booking');
      }
      // If deletion is successful, refetch the bookings to update the UI
      fetchBookings();
      setDeleteId(null); // Reset delete ID after successful deletion
    } catch (error) {
      console.error('Error deleting hall booking:', error.message);
    }
  };

  const currentDate = new Date();

  const futureBookings = hallReserves ? hallReserves.filter(booking => new Date(booking.selectdate) >= currentDate) : [];
  const pastBookings = hallReserves ? hallReserves.filter(booking => new Date(booking.selectdate) < currentDate) : [];

  return (
    <div>
      <Header />
     
    <div className="container mt-5 serif">
      <div className="mb-4">
        <h1 className="fw-bold display-4">Hall Bookings</h1>
      </div>
      
      {/* Future Bookings */}
      <div className="mb-4">
        <h2 className="fw-bold">Future Bookings</h2>
        <div className="row">
          {futureBookings.map((hallReserve) => (
            <div key={hallReserve._id} className="col-md-4 mb-4">
              <div className="card rounded h-100 bg-light-blue hover-bg-light-blue serif">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{hallReserve.hall}</h5>
                  <p className="card-text">Event Type: {hallReserve.eventtype}</p>
                 
                  <p className="card-text">Selected Date: {hallReserve.selectdate}</p>
                  <p className="card-text"> Time: {hallReserve.fromTime}-{hallReserve.toTime}</p>
                  
                  
                  <div className="mt-auto d-flex justify-content-end">
                    <Link to={`/editBooking/${hallReserve._id}`} className="btn btn-primary me-2">Edit</Link>
                    <Link to={`/bookingdata/${hallReserve._id}`} className="btn btn-primary me-2">View</Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(hallReserve._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirmationModal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Bookings */}
      <div>
        <h2 className="fw-bold">Past Bookings</h2>
        <div className="row">
          {pastBookings.map((hallReserve) => (
            <div key={hallReserve._id} className="col-md-4 mb-4">
              <div className="card rounded h-100 bg-light-blue hover-bg-light-blue serif">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{hallReserve.hall}</h5>
                  <p className="card-text">Event Type: {hallReserve.eventtype}</p>
             
                  <p className="card-text">Selected Date: {hallReserve.selectdate}</p>
                  <p className="card-text"> Time: {hallReserve.fromTime}-{hallReserve.toTime}</p>
                
                  <div className="mt-auto d-flex justify-content-end">
                    <Link to={`/bookingdata/${hallReserve._id}`} className="btn btn-primary me-2">View</Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(hallReserve._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirmationModal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
      </div>
      <Link to='/' className='btn btn-primary mt-3'>
  Back to venues
</Link>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteConfirmationModalLabel">Confirm Delete</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>After deleting, please note that this action cannot be undone. Are you sure you want to delete this hall booking?</p>
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

export default BookHall;
