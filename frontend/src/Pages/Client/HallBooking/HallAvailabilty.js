import React, { useState, useEffect, useContext } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import moment from 'moment';
import { AuthContext } from '../../../context/AuthContext';

const HallAvailability = ({ halls }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log('Selected Date:', e.target.value);
  };

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
    console.log('From Time:', e.target.value);
  };

  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
    console.log('To Time:', e.target.value);
  };
  
  return (
    <div className='mt-5 '>
      <h1>Hall Availability</h1>
      <p>
        Let's find the perfect time for your event! Please choose the date and time you have in mind, and we'll check hall availability for you.
      </p>
      <div className="row mt-5 serif ">
        <div className="col-md-4 mx-auto">
          <div className="mb-3">
            <label htmlFor="datePicker" className="form-label">Select Date</label>
            <input type="date" id="datePicker" className="form-control" onChange={handleDateChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="fromTimePicker" className="form-label">Select Time From</label>
            <input type="time" id="fromTimePicker" className="form-control" onChange={handleFromTimeChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="toTimePicker" className="form-label">Select Time To</label>
            <input type="time" id="toTimePicker" className="form-control" onChange={handleToTimeChange} />
          </div>
        </div>
        <div className="row mx-auto">
          {halls ? (
            halls.map((hall) => (
              <div key={hall._id} className="col-md-4 mb-4 ">
                <div className="card  rounded h-100 bg-light-blue hover-bg-light-blue serif">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold"> {hall.Name}</h5>
                    <p className="card-text">Capacity: {hall.capacity}</p>
                    <p className="card-text">Price: Rs{hall.price} per hour</p>
                    <div className="d-flex mt-auto justify-content-end">
                    <Link to={`/AddHall/${hall._id}?selectedDate=${selectedDate}&fromTime=${fromTime}&toTime=${toTime}&hallName=${hall.Name}`} className="btn btn-primary rounded-pill me-2" style={{ minWidth: '100px' }}>
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="fs-5 fw-light italic">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

const AllHallList = () => {
  const [halls, setHalls] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return; 
    }
    const fetchHall = async () => {
      try {
        const response = await fetch("http://localhost:4000/hall/");
        if (!response.ok) {
          throw new Error("Failed to fetch halls");
        }
        const json = await response.json();
        setHalls(json);
      } catch (error) {
        console.error("Error fetching halls data:", error);
      }
    };
    fetchHall();
  }, []);

  return (
    <div>
      {halls && <HallAvailability halls={halls} />}
    </div>
  );
}

export default AllHallList;
