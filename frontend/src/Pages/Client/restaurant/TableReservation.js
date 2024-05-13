// import React, { useEffect, useState } from "react";
// import useTableReservationsByEmail from "../../../hooks/Client/restaurant/useTableResvList";
// import useDeleteReservation from "../../../hooks/Staff/restaurantManager/useDeleteTableReservation";
// import useUpdateReservation from "../../../hooks/Staff/restaurantManager/useUpdateReservation";

// const TableReservation = () => {
//   const { reservations, isLoading, error } = useTableReservationsByEmail();
//   const { deleteTableReservation } = useDeleteReservation();
//   const { updateReservation } = useUpdateReservation();
//   const [idToDelete, setidToDelete] = useState("");

//   const [filterDate, setFilterDate] = useState(""); // State variable to store the filtered date
//   const [nameToDelete, setNameToDelete] = useState("");

//   const [IdToUpdate, setIdToUpdate] = useState("");
//   const [Date, setDate] = useState("");
//   const [Name, setName] = useState("");
//   const [Capacity, setCapacity] = useState("");
//   const [email, setemail] = useState("");
//   const [contactNumber, setcontactNumber] = useState("");

//   // Filtering function
//   const filteredTableList = reservations.filter((table) => {
//     return filterDate ? table.Date === filterDate : true;
//   });

//   const handleFilterChange = (e) => {
//     setFilterDate(e.target.value);
//   };

//   const getUpdateData = (Table) => {
//     // Your existing code for updating data
//     setIdToUpdate(Table._id);
//     setDate(Table.Date);
//     setName(Table.Name);
//     setCapacity(Table.Capacity);
//     setemail(Table.email);
//     setcontactNumber(Table.contactNumber);
//   };

//   const updateDetails = async () => {
//     // Your existing code for updating details
//     await updateReservation(
//       IdToUpdate,
//       Date,
//       Name,
//       Capacity,
//       email,
//       contactNumber
//     );
//   };

//   const handleDelete = async () => {
//     await deleteTableReservation(idToDelete);
//     console.log(isLoading, "handleDelete loading");
//     setidToDelete("");
//   };

//   if (isLoading) {
//     return (
//       <div className="alert alert-primary" role="alert">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1 className="mb-4 mt-5">My Reservations</h1>

//       <div className="mb-3 ">
//         <label htmlFor="filterDate" className="form-label">
//           Filter by Date:
//         </label>
//         <input
//           type="date"
//           id="filterDate"
//           className="form-control"
//           value={filterDate}
//           onChange={handleFilterChange}
//         />
//       </div>

//       <div className="d-flex align-items-center justify-content-around mb-3">
//         <table className="table" style={{ width: "75rem" }}>
//           <thead>
//             <tr className="border border-black" scope="col">
//               <th scope="col">Date</th>
//               <th scope="col">Name</th>
//               <th scope="col">Capacity</th>
//               <th scope="col">Email</th>
//               <th scope="col">Contact No</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservations.map((Table) => (
//               <tr key={Table._id} className="border border-black" scope="col">
//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <input
//                       className="tabledit-input form-control input-sm"
//                       type="Date"
//                       name="Date"
//                       defaultValue={Table.Date}
//                       disabled=""
//                       onChange={(e) => {
//                         setDate(e.target.value);
//                       }}
//                     ></input>
//                   ) : (
//                     <td>{Table.Date}</td>
//                   )}
//                 </td>
//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <input
//                       className="tabledit-input form-control input-sm"
//                       type="text"
//                       name="Name"
//                       defaultValue={Table.Name}
//                       disabled=""
//                       onChange={(e) => {
//                         setName(e.target.value);
//                       }}
//                     ></input>
//                   ) : (
//                     <td>{Table.Name}</td>
//                   )}
//                 </td>
//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <input
//                       className="tabledit-input form-control input-sm"
//                       type="number"
//                       name="Capacity"
//                       defaultValue={Table.Capacity}
//                       disabled=""
//                       onChange={(e) => {
//                         setCapacity(e.target.value);
//                       }}
//                     ></input>
//                   ) : (
//                     <td>{Table.Capacity}</td>
//                   )}
//                 </td>

//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <input
//                       className="tabledit-input form-control input-sm"
//                       type="email"
//                       name="email"
//                       defaultValue={Table.email}
//                       disabled=""
//                       onChange={(e) => {
//                         setemail(e.target.value);
//                       }}
//                     ></input>
//                   ) : (
//                     <td>{Table.email}</td>
//                   )}
//                 </td>

//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <input
//                       className="tabledit-input form-control input-sm"
//                       type="number"
//                       name="contactNumber"
//                       defaultValue={Table.contactNumber}
//                       disabled=""
//                       onChange={(e) => {
//                         setcontactNumber(e.target.value);
//                       }}
//                     ></input>
//                   ) : (
//                     <td>{Table.contactNumber}</td>
//                   )}
//                 </td>

//                 <td>
//                   {/* Your update and delete buttons */}

//                   <button
//                     type="button"
//                     class="btn btn-primary  mt-5"
//                     className="btn btn-danger"
//                     data-bs-toggle="modal"
//                     data-bs-target="#Modal"
//                     onClick={() => setidToDelete(Table._id)}
//                   >
//                     Cancel Reservation
//                   </button>
//                 </td>

//                 <td>
//                   {IdToUpdate === Table._id ? (
//                     <a
//                       href="#"
//                       className="btn btn-primary"
//                       onClick={() => updateDetails()}
//                     >
//                       Save
//                     </a>
//                   ) : (
//                     <a
//                       href="#"
//                       className="btn btn-primary"
//                       onClick={() => getUpdateData(Table)}
//                     >
//                       Update Details
//                     </a>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal and delete button */}
//       <div
//         className="modal fade"
//         id="Modal"
//         tabindex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 CAUTION
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               Are you sure you want to cancel this Order?
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>

//               <form action="" method="delete">
//                 <button
//                   className="btn btn-outline-danger"
//                   onClick={handleDelete}
//                 >
//                   CANCEL
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableReservation;

import React from "react";
import useTableReservationsByEmail from "../../../hooks/Client/restaurant/useTableResvList";

const ReservationList = () => {
  const userEmail = localStorage.getItem("email");
  const { reservations, loading, error } = useTableReservationsByEmail(userEmail);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5 vh-100">
      <h2 className="mb-4">Your Table Reservations</h2>
      <div className="row border border-3 p-2 bg-primary bg-opacity-25">
        <div className="col-2"><h6>Table Reservation No</h6></div>
        <div className="col-2"><h6>Date</h6></div>
        <div className="col-2"><h6>Time Slot</h6></div>
        <div className="col-1"><h6>Guests</h6></div>
        <div className="col-2"><h6>Contact</h6></div>
        <div className="col-2"><h6>Email</h6></div>
      </div>
      {reservations.map((reservation) => (
        <div key={reservation._id} className="row border p-2 bg-secondary bg-opacity-25">
          <div className="col-2">{reservation.tableReservationNo}</div>
          <div className="col-2">{reservation.date}</div>
          <div className="col-2">{reservation.timeSlot}</div>
          <div className="col-1">{reservation.Noofguests}</div>
          <div className="col-2">{reservation.contactNumber}</div>
          <div className="col-2">{reservation.email}</div>
        </div>
      ))}
    </div>
  );
};

export default ReservationList;


