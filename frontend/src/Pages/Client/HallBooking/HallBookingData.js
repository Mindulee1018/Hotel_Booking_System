import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HallBookingData = () => {
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:4000/hallR/hallres/${id}`);
        const data = await response.json();
console.log(data)
        if (!response.ok) {
          setError(data.message || 'Failed to fetch reservation');
          setReservation(null);
          return;
        }
     
        if (!data.success) {
          setError(data.message || 'Failed to fetch reservation');
          setReservation(null);
          return;
        }

        setReservation(data.data);
        setError(null);
      } catch (error) {
        setError('Error retrieving reservation');
        setReservation(null);
      }
    };

    fetchReservation();
  }, [id]);

  return (
    <div className="container mt-5 serif">
      <h2>Reservation Details</h2>
      {error && <p className="text-danger">{error}</p>}
      {reservation && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Reservation ID: {reservation._id}</h3>
            <p className="card-text"><strong>Reservation Name:</strong> {reservation.hall}</p>
            <p className="card-text"><strong>Hall Name :</strong> {reservation.hallid}</p>
            <p className="card-text"><strong>Event Type:</strong> {reservation.eventtype}</p>
            <p className="card-text"><strong>Capacity:</strong> {reservation.capacity}</p>
            <p className="card-text"><strong>Select Date:</strong> {reservation.selectdate}</p>
            <p className="card-text"><strong>From Time:</strong> {reservation.fromTime}</p>
            <p className="card-text"><strong>To Time:</strong> {reservation.toTime}</p>
            <p className="card-text"><strong>Total Hours:</strong> {reservation.totalhours}</p>
            <p className="card-text"><strong>Status:</strong> {reservation.status}</p>
            <h4 className="card-title">Resources</h4>
            {reservation.Resources.map((resource, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <p className="card-text"><strong>Arrangement Style:</strong> {resource.arrangementStyle}</p>
                  <p className="card-text"><strong>Food Arrangement:</strong> {resource.foodArrangement || 'None'}</p>
                  <p className="card-text"><strong>Bar Arrangement:</strong> {resource.barArrangement || 'None'}</p>
                  <p className="card-text"><strong>Decor Arrangement:</strong> {resource.decorArrangement || 'None'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HallBookingData;
