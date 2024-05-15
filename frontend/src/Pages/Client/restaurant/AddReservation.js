import { useState , useEffect} from "react";
import useAddReservation from "../../../hooks/Client/restaurant/useAddReservation";
import { useNavigate } from "react-router-dom";


function AddReservation() {

const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [Noofguests, setNoofguests] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('user');

  useEffect(() => {
    if (!token) {
      // alert("You need to log in first.");
      navigate("/login"); 
    }
  }, [token, navigate]);

  const checkempty = ()=>{
    if(!date || !timeSlot || !customerName || !Noofguests || !email || !contactNumber){
      alert("All feilds must be filled")
      return false;
    }else if(contactNumber.length < 10) {
      alert('Invalid Contact Number.');
      return false
    }else{
      return true; 
    }
   
  }

  function generatereservationNumber(prefix = 'TR', numDigits = 8) {
    const randomNumber = Math.floor(Math.random() * Math.pow(10, numDigits));
    const formattedNumber = String(randomNumber).padStart(numDigits, '0');
    return prefix + formattedNumber;
  }
  
  const tableReservationNo = generatereservationNumber();

  const {
    availabilityMessage,
    reservationMessage,
    checkAvailability,
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



  const handleNext = () => {

    if (!checkempty()) {
      return;
    }
    // Pass data to rooms page
    navigate("/Addpayment", {
      state: {
        tableReservationNo,
        date,
        timeSlot,
        customerName,
        Noofguests,
        email,
        contactNumber,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="container text-center"> 
      <h3 className="mt-4">Table Reservation</h3>
      <div className="d-flex flex-column align-items-center">
        <div className="card mb-3 w-50">
          <div className="card-header"> 
            Check Availability
          </div>
          <div className="card-body">
            <div className="form-group"> 
              <label htmlFor="reservation-date">Date:</label> 
              <input
                type="date"
                className="form-control"
                id="reservation-date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reservation-timeSlot">Time Slot:</label>
              <select
                className="form-control" 
                id="reservation-timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select a Time Slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary mt-3" 
              onClick={handleCheckAvailability}
            >
              Check Availability
            </button>
            {availabilityMessage && ( 
              <p className="mt-3 text-muted">{availabilityMessage}</p>
            )}
          </div>
        </div>

        <div className="card w-50">
          <div className="card-header">
            Make a Reservation
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="customer-name">Customer Name:</label>
              <input
                type="text"
                className="form-control"
                id="customer-name"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div classdivision className="form-group">
              <label htmlFor="number-of-guests">Number of Guests:</label>
              <input
                type="number"
                className="form-control"
                id="number-of-guests"
                placeholder="Number of Guests"
                value={Noofguests}
                onChange={(e) => setNoofguests(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-number">Contact Number:</label>
              <input
                type="number"
                className="form-control"
                id="contact-number"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn btn-success mt-3" 
              onClick={handleNext}
            >
              Make Reservation
            </button>
            {reservationMessage && ( 
              <p className="mt-3 text-muted">{reservationMessage}</p>
            )}
             <p class="text-info mt-2 fw-bold">When reserving a table through the hotel website, an advance payment of Rs. 1000.00 will be charged.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


export default AddReservation;