import React from 'react';
import ManagerPanel from '../../components/RoomManagerNavbar';
import RoomReservationList from '../../hooks/useRoomReservationList';
import RoomSideBar from '../../components/RoomSideBar';

function Bookings() {

    const { roomreservation, isLoading, error } = RoomReservationList();
  //const { deleteRoomReserve} = useDeleteRoomReserve();
  //const [reservationIdToDelete, setreservationId] = useState("");
  

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
        <div className='vh-100 row p-0 m-0'>
           <RoomSideBar/>
           
            <h2>Bookings</h2>
           {roomreservation.map((reservation)=> (
                <div className="card">
                {/* List of bookings */}
                <table className="table col p-0 m-0">
                    <thead>
                        <tr>
                           
                            <th>Booking ID</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{reservation._id}</td>
                            <td>{reservation.Checkindate}</td>
                            <td>{reservation.Checkoutdate}</td>
                            {/* <td>{reservation.price}</td>
                            <td>{reservation.status}</td> */}
                            
                        </tr>
                        {/* Add more rows for additional bookings */}
                    </tbody>
                </table>
            </div>


            )
            
            )
}
            
        </div>
    );
}

export default Bookings;
