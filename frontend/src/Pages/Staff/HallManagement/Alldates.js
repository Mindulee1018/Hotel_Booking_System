import React, { useState, useEffect } from 'react';

function Alldates() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:4000/hallR/hallres');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      console.log(data);
      setReservations(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Failed to fetch reservations. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Reservations</h2>
      <ul>
        {reservations.map((reservation, index) => (
          <li key={index}>
            <p>Date: {reservation.selectdate}</p>
            <p>From Time: {reservation.fromTime}</p>
            <p>To Time: {reservation.toTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alldates;
