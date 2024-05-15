

import { useState } from 'react';
import { usePaymentSubmission } from '../hooks/usePayment';
import { useFormState } from '../hooks/usePayment';
import { useLocation } from 'react-router-dom';
import useAddOrder from '../hooks/Client/restaurant/useAddOrder';
import useAddRoomReserve from '../hooks/Client/roomBooking/useAddRoomReserve';
import useAddReservation from '../hooks/Client/restaurant/useAddReservation';

function AddPayment() {
  const location = useLocation();
  const { AddOrder } = useAddOrder();
  const { addRoomReserve } = useAddRoomReserve();
  const { availabilityMessage, reservationMessage,checkAvailability, makeReservation, } = useAddReservation();

  const {
    orderNumber,
    productname,
    price,
    Quantity,
    cusName,
    email,
    contactNumber,
    Total,
    Checkindate,
    Checkoutdate,
    NoOfGuests,
    Rtype,
    noOfRooms,
    RoomNumbers,
    firstName,
    lastName,
    Email,
    Address,
    phoneno,
    roomreservationNo,
    tableReservationNo,
    date,
    timeSlot,
    customerName,
    Noofguests,
  } = location.state || {};

  const { formData, handleOnChange } = useFormState({
    c_name: "",
    email: "",
    card_number: "",
    cvc: "",
    card_expiration: "",
  });

      console.log(productname)
    console.log(price)
    console.log(orderNumber)
    console.log(Quantity)
    console.log(cusName)
    console.log(email)
    console.log(contactNumber)
    console.log(Total)
    // console.log(Checkindate)
    // console.log(Checkoutdate)
    // console.log(NoOfGuests)
    // console.log(Rtype)
    // console.log(noOfRooms)
    // console.log(RoomNumbers)
    // console.log(firstName)
    // console.log(lastName)
    // console.log(Email)
    // console.log(Address)
    // console.log(phoneno)
    // console.log(roomreservationNo)
    // console.log(tableReservationNo)
    // console.log(date)
    // console.log(timeSlot)
    // console.log(customerName)
    // console.log(Noofguests)
    // console.log(email)
    // console.log(contactNumber)

  const [emailState, setEmailState] = useState(Email || email); 
  const [error, setError] = useState(null);

  const { submitOrder, sendThankYouEmail } = usePaymentSubmission();

  const handleEmailChange = (e) => {
    setEmailState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.c_name || !emailState || !formData.card_number || !formData.card_expiration) {
      setError("All fields are required.");
      return;
    }

    if (formData.card_number.length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    } 

    if (formData.cvc.length !== 3) {
      setError('CVC must be 3 digits');
      return false;
    } 

    setError(null);

    try {
      const { c_name, card_number, card_expiration } = formData;
      const reserveid = roomreservationNo || orderNumber || tableReservationNo;
      const orderData = { reserveid, c_name, email: emailState, card_number, card_expiration };

      const response = await submitOrder(orderData);

      if (response.ok) {
        console.log("Payment Success:", await response.json());

        if (orderNumber) {
          // Call AddOrder for orders
          await AddOrder(orderNumber, productname, Quantity, price, cusName, email, contactNumber, Total);
        } else if (roomreservationNo) {
          // Call addRoomReserve for room reservations
          await addRoomReserve(roomreservationNo,Checkindate, Checkoutdate, NoOfGuests, Rtype, noOfRooms, RoomNumbers, firstName, lastName, Email, Address, phoneno, price);
        } else if (tableReservationNo){
          // Call makeReservation for table reservations
          const reservationData = {
            tableReservationNo,
            date,
            timeSlot,
            customerName,
            Noofguests,
            email,
            contactNumber,
          };
          makeReservation(reservationData);
        }

        await sendThankYouEmail(emailState); // Send thank you email
        alert("Payment Success!");
      } else {
        throw new Error("Failed to add Payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
            <div className="add-paym">
            <form onSubmit={handleSubmit}>
                <h2 className='hed2'>Payment Form</h2>
                <label>Customer Name:</label>
                <input type="text" id="c_name" name="c_name" value={formData.c_name} onChange={handleOnChange} /><br />
                <label>Email:</label>
                <input type="text" id="email" name="email" value={emailState} readOnly onChange={handleEmailChange} /><br />
                <label>Card Number:</label>
                <input type="number" id="card_number" name="card_number" value={formData.card_number} onChange={handleOnChange} /><br />
                <label>Cvc:</label>
                <input type="number" id="cvc" name="cvc" value={formData.cvc} onChange={handleOnChange} /><br />
                <label>Card Expiration:</label>
                <input type="date" id="card_expiration" name="card_expiration" value={formData.card_expiration} onChange={handleOnChange} /><br />
                
                {error && <div className="error">{error}</div>}
                <button id="addbtn">Add Payment</button>
            </form><br />
        </div>
  );
}

export default AddPayment;





