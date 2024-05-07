import { useState } from "react";
import useAddReservation from "../../../hooks/Client/restaurant/useAddReservation";

function AddReservation() {
//   const [Date, setDate] = useState("");
//   const [Name, setName] = useState("");
//   const [Capacity, setCapacity] = useState("");
//   const [email, setemail] = useState("");
//   const [contactNumber, setcontactNumber] = useState("");
//   const [formError, setFormError] = useState("");
//   const { AddResev, isLoading, error } = useAddReservation();

//   const handleSubmit = async (e) => {
//     //await AddResev(Date, Name, Capacity, email, ContactNumber);
//     e.preventDefault();
//     if (!validate()) return;

//     await AddResev(Date, Name, Capacity, email, contactNumber);
//   };

//   const validate = () => {
//     const allFieldsFilled = Date && Name && Capacity && email && contactNumber;

//     //const errorElement = document.getElementById("Error");
//     if (!allFieldsFilled) {
//       setFormError("All fields must be filled."); // using React state for error message
//       return false;
//     } else {
//       setFormError(""); // clear error message
//       return true;
//     }
//   };

//   return (
//     <div className="row d-flex align-items-center justify-content-center">
//       <h1 className="m-5">Create Table Reservation</h1>
//       <form
//         className="bg-primary bg-opacity-50"
//         onSubmit={handleSubmit}
//         style={{ width: "25rem" }}
//       >
//         <lable className="form-label mt-3">Enter Date:</lable>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           className="form-control"
//           //min={new Date().toISOString().split("T")[0]}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <lable className="form-label mt-3">Enter Customer Name:</lable>
//         <input
//           type="text"
//           className="form-control"
//           onChange={(e) => setName(e.target.value)}
//         />

//         <lable className="form-label mt-3">No.of.Persons:</lable>
//         <input
//           type="number"
//           className="form-control"
//           onChange={(e) => setCapacity(e.target.value)}
//         />

//         <lable className="form-label mt-3">Email:</lable>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           className="form-control"
//           onChange={(e) => setemail(e.target.value)}
//         />

//         <lable className="form-label mt-3">Contact Number:</lable>
//         <input
//           type="number"
//           className="form-control"
//           onChange={(e) => setcontactNumber(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="btn btn-success mt-4 mb-2"
//           id="submit"
//           onClick={validate}
//         >
//           Add Reservation
//         </button>

//         <h6>15% extra charge PP</h6>

//         {formError && <div id="Error" className="error">{formError}</div>}

//         {/* {error && <div className="error">{error}</div>} */}
//       </form>
//     </div>
//   );
// }
// export default AddReservation;

// const { checkAvailability, reserveTable, availability, error } = useAddReservation();
// const [formData, setFormData] = useState({
//   tableId: 1,
//   date: '',
//   timeSlot: '',
//   customerName: '',
//   email: '',
//   contactNumber: '',
// });

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

// const handleCheckAvailability = () => {
//   const { date, timeSlot } = formData;
//   if (date && timeSlot) {
//     checkAvailability(date, timeSlot); // Check if tables are available for the given date and time slot
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   await reserveTable(formData); // Create a new reservation
// };

// return (
//   <div>
//     <h2>Table Reservation Form</h2>
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label>
//           Date:
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//       </div>
//       <div className="mb-3">
//         <label>
//           Time Slot:
//           <input
//             type="text"
//             name="timeSlot"
//             value={formData.timeSlot}
//             onChange={handleInputChange}
//             placeholder="e.g., 18:00-20:00"
//             required
//           />
//         </label>
//       </div>
//       <button type="button" onClick={handleCheckAvailability}>
//         Check Availability
//       </button>
//       <p>Available Tables: {availability.availableCount}</p> {/* Display available table count */}

//       {/* Reservation details */}
//       <div className="mb-3">
//         <label>
//           Customer Name:
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//       </div>
//       <div className="mb-3">
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//       </div>
//       <div className="mb-3">
//         <label>
//           Contact Number:
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//       </div>

//       <button type="submit">Reserve Table</button>
//     </form>

//     {/* Display error message if any */}
//     {error && <p className="text-danger">{error}</p>}
//   </div>
// );
// };


//add no of guest as input 
// create resevation id
//ui and validations
//make login required
const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const {
    availabilityMessage,
    reservationMessage,
    checkAvailability,
    makeReservation,
  } = useAddReservation();

 
  const timeSlots = [
    '07:00 - 08:00',
    '08:00 - 09:00',
    '09:00 - 10:00',
    '11:30 - 12:30',
    '12:30 - 13:30',
    '13:30 - 14:30',
    '15:30 - 16:30',
    '16:30 - 17:30',
    '19:30 - 20:30',
    '20:30 - 21:30',
    '21:30 - 22:30',
  ];

  const handleCheckAvailability = () => {
    checkAvailability(date, timeSlot);
  };

  const handleMakeReservation = () => {
    const reservationData = {
      date,
      timeSlot,
      customerName,
      email,
      contactNumber,
    };
    makeReservation(reservationData);
  };

  return (
    <div>
      <h1>Table Reservation System</h1>
      <div>
        <h2>Check Availability</h2>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          <option value=''>Select a Time Slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <button onClick={handleCheckAvailability}>Check Availability</button>
        <p>{availabilityMessage}</p>
      </div>
      <div>
        <h2>Make a Reservation</h2>
        <input
          type='text'
          placeholder='Customer Name'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='number'
          placeholder='Contact Number'
          value={contactNumber}
          onChange={(e) => setContactNumber(parseInt(e.target.value))}
        />
        <button onClick={handleMakeReservation}>Make Reservation</button>
        <p>{reservationMessage}</p>
      </div>
    </div>
  );
};


export default AddReservation;
