import React, { useState, useContext } from 'react';
import { useLocation,Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../../../context/AuthContext';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import SearchHeader from '../../../components/SearchHeader';

const HallReservationForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    bookingName: '',
    eventType: '',
    capacity: '',
    arrangementStyle: '',
    foodArrangement: '',
    barArrangement: '',
    decorArrangement: '',
  });

  const [cateringNeeded, setCateringNeeded] = useState(false);
  const [decorNeeded, setDecorNeeded] = useState(false);
  const [capacityError, setCapacityError] = useState('');
  const [chairError, setChairError] = useState('');
  const [tableError, setTableError] = useState('');
  const [maxCapacityError, setMaxCapacityError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false); // Add state for success toast

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error message when input value is valid
    if (name === 'capacity' && parseInt(value) >= 0) {
      setCapacityError('');
      if (parseInt(value) > maxCapacity) {
        setMaxCapacityError(`Maximum capacity for ${hallName} is ${maxCapacity}`);
      } else {
        setMaxCapacityError('');
      }
    }
    if (name === 'numberOfChairs' && parseInt(value) >= 0) {
      setChairError('');
    }
    if (name === 'numberOfTables' && parseInt(value) >= 0) {
      setTableError('');
    }
  };

  const handleCateringChange = (e) => {
    setCateringNeeded(e.target.checked);
  };

  const handleDecorChange = (e) => {
    setDecorNeeded(e.target.checked);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedDate = searchParams.get('selectedDate');
  const fromTime = searchParams.get('fromTime');
  const toTime = searchParams.get('toTime');
  const hallName = searchParams.get('hallName');
  

  let maxCapacity = hallName === 'Hall pearl' ? 199 : 499;

  let totalHours = '';

  const fromMoment = moment(fromTime, 'HH.mm');
  const toMoment = moment(toTime, 'HH.mm');

  if (fromMoment.isValid() && toMoment.isValid()) {
    const totaltime = moment.duration(toMoment.diff(fromMoment));
    totalHours = totaltime.asHours();
  } else {
    console.error('Invalid time format');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userid = 'eventmanager@gmail.com'; // Default userid
    if (user && user.token) {
      userid = user.email; // Use userid from user if logged in
    } else {
      alert('User not found'); // Display alert if user is not found
      return;
    }
    if (
      !formData.bookingName ||
      !formData.eventType ||
      !formData.capacity ||
      !formData.numberOfChairs ||
      !formData.numberOfTables
    ) {
      alert('Please fill in all required fields'); // Display alert if any required field is empty
      return;
    }
    if (parseInt(formData.capacity) < 0) {
      setCapacityError('Capacity cannot be negative');
      return;
    }
    if (parseInt(formData.numberOfChairs) < 0) {
      setChairError('Number of chairs cannot be negative');
      return;
    }
    if (parseInt(formData.numberOfTables) < 0) {
      setTableError('Number of tables cannot be negative');
      return;
    }
    if (parseInt(formData.capacity) > maxCapacity) {
      setMaxCapacityError(`Maximum capacity for ${hallName} is ${maxCapacity}`);
      return;
    }
    // Set the fixed userid and hallid
    const hallid = '66091b49a3b21f794f0e29aa';

    try {
      // Construct the reservation data object
      const reservationData = {
        hall: formData.bookingName,
        hallid: hallName,
        email: userid,
        eventtype: formData.eventType,
        capacity: formData.capacity,
        selectdate: selectedDate,
        fromTime: fromTime,
        toTime: toTime,
        totalhours: totalHours,
        status: 'booked',
        Resources: [
          {
            arrangementStyle: formData.arrangementStyle,
            foodArrangement: cateringNeeded ? formData.foodArrangement : null,
            barArrangement: cateringNeeded ? formData.barArrangement : null,
            decorArrangement: decorNeeded ? formData.decorArrangement : null,
            numberOfChairs: formData.numberOfChairs,
            numberOfTables: formData.numberOfTables,
          },
        ],
      };

      // Log the constructed reservation data
      console.log('Sending reservation data:', reservationData);

      // Make the POST request to the backend API
      const response = await fetch('http://localhost:4000/hallR/addres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      // Parse the response data
      const data = await response.json();
      console.log('Reservation created:', data);
      alert('reservation added successfully')
      selectedDate='none'
      fromTime='none'
      toTime='none';
  
      setShowSuccessToast(true); // Show success toast
    } catch (error) {
      console.error('Error creating reservation:', error.message);
      // Optionally, you can handle errors gracefully (e.g., displaying an error message to the user)
    }
  };

  return (
    <div>
      <SearchHeader />
    <div className="container mt-5 serif bold">
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <h3>Booking Details For {hallName}</h3>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Booking Name"
            name="bookingName"
            value={formData.bookingName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="conference">Conference</option>
            <option value="party">Party</option>
            <option value="party">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <p className="form-control">Selected Date: {selectedDate}</p>
          <input type="hidden" name="selectDate" value={selectedDate} />
        </div>
        <div className="mb-3">
          <p className="form-control">From Time: {fromTime}</p>
          <input type="hidden" name="fromTime" value={fromTime} />
        </div>
        <div className="mb-3">
          <p className="form-control">To Time: {toTime}</p>
          <input type="hidden" name="toTime" value={toTime} />
        </div>
        <div className="mb-3">
          <p className="form-control">Total Time: {totalHours} hours </p>
          <input type="hidden" name="totalHours" value={totalHours} />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            className="form-control"
            
            max={maxCapacity}
          />
          {capacityError && <p className="text-danger">{capacityError}</p>}
          {maxCapacityError && <p className="text-danger">{maxCapacityError}</p>}
        </div>
        <div className="mb-3">
          <select
            name="arrangementStyle"
            value={formData.arrangementStyle}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select Arrangement Style</option>
            <option value="theatre">Theatre</option>
            <option value="boardroom">Boardroom</option>
            <option value="banquet">Banquet</option>
            <option value="none">None needed</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Number of Chairs"
            name="numberOfChairs"
            value={formData.numberOfChairs}
            onChange={handleInputChange}
            className="form-control"
           
          />
          {chairError && <p className="text-danger">{chairError}</p>}
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Number of Tables"
            name="numberOfTables"
            value={formData.numberOfTables}
            onChange={handleInputChange}
            className="form-control"
           
          />
          {tableError && <p className="text-danger">{tableError}</p>}
        </div>
        {/* Catering */}
        <h3>Catering</h3>
        <div className="mb-3">
          <input
            type="checkbox"
            id="cateringSwitch"
            checked={cateringNeeded}
            onChange={handleCateringChange}
            className="form-check-input"
          />
          <label htmlFor="cateringSwitch" className="form-check-label">
            Catering Needed
          </label>
        </div>
        {cateringNeeded && (
          <>
            <div className="mb-3">
              <select
                name="foodArrangement"
                value={formData.foodArrangement}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Food Arrangement</option>
                <option value="buffet">Buffet</option>
                <option value="plated">Plated</option>
                <option value="custom">Custom Menu</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                name="barArrangement"
                value={formData.barArrangement}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select Bar Arrangement</option>
                <option value="open">Open Bar</option>
                <option value="cash">Cash Bar</option>
                <option value="limited">Limited Bar</option>
              </select>
            </div>
          </>
        )}

        {/* Decor */}
        <h3>Decor</h3>
        <div className="mb-3">
          <input
            type="checkbox"
            id="decorSwitch"
            checked={decorNeeded}
            onChange={handleDecorChange}
            className="form-check-input"
          />
          <label htmlFor="decorSwitch" className="form-check-label">
            Decoration Needed
          </label>
        </div>
        {decorNeeded && (
          <div className="mb-3">
            <select
              name="decorArrangement"
              value={formData.decorArrangement}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Decoration Arrangement Style</option>
              <option value="modern">Modern</option>
              <option value="vintage">Vintage</option>
              <option value="rustic">Rustic</option>
            </select>
          </div>
        )}
        {/* Additional requirements textarea */}
        <div className="mb-3">
          <label htmlFor="otherRequirements" className="form-label">
            Other Requirements
          </label>
          <textarea
            id="otherRequirements"
            name="otherRequirements"
            value={formData.otherRequirements}
            onChange={handleInputChange}
            className="form-control"
            rows="4"
            placeholder="Please specify any other requirements or changes here..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      
      <p>For further details please email or contact us</p>
       {/* Success Toast */}
       <div className={`toast align-items-center text-white bg-success ${showSuccessToast ? 'show' : ''}`} role="alert">
        <div className="d-flex">
          <div className="toast-body">Reservation added successfully</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowSuccessToast(false)}
          ></button>
        </div>
      </div>
      
      
    </div>
    <Link to='/Addpayment' className='btn btn-primary'>
                       pay now 
                      </Link>
    <Link to='/availability' className='btn btn-primary'>
                       Back 
                      </Link>
    <Footer />
    </div>
    
  );
};


export default HallReservationForm;