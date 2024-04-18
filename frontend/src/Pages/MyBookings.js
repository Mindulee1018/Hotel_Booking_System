import React from 'react';
import RoomReservationList from '../hooks/useRoomReservationList'
import useDeleteRoomReserve from '../hooks/useDeleteRoomReserve';
import { useState } from "react"

function Mybookings () {
  const { roomreservation, isLoading, error } = RoomReservationList();
  const { deleteRoomReserve} = useDeleteRoomReserve();
  const [reservationIdToDelete, setreservationId] = useState("");
  

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

  const handleDelete = async (id) => {
    await deleteRoomReserve(id);
    console.log(reservationIdToDelete);
    setreservationId('');
  };




    return (
        <div className='vh-100'>
            <h2>My Bookings</h2>
           {roomreservation.map((reservation)=> (
                <div className="card">
                
                <table className="table">
                    <thead>
                        <tr>
                           
                            <th>Booking ID</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{reservation._id}</td>
                            <td>{reservation.Checkindate}</td>
                            <td>{reservation.Checkoutdate}</td>
                            {/* <td>{reservation.price}</td>
                            <td>{reservation.status}</td> */}
                            <td><button onClick={()=>{
                              setreservationId(reservation._id);
                              handleDelete();
                              }}>Cancel</button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>


            )
            
            )
}
            
        </div>
    );
}

export default Mybookings ;
