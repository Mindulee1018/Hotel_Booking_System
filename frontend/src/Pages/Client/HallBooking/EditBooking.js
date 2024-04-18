import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBooking = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState({});
    const [formData, setFormData] = useState({
      bookingName: '',
      eventType: '',
      selectDate: '',
      fromTime: '',
      toTime: '',
      totalHours: '',
      capacity: '',
      arrangementStyle: '',
      numberOfChairs: '',
      numberOfTables: '',
      foodArrangement: '',
      barArrangement: '',
      decorArrangement: '',
      otherRequirements: ''
    });
    const [loading, setLoading] = useState(true);
    const [capacityError, setCapacityError] = useState('');
    const [chairError, setChairError] = useState('');
    const [tableError, setTableError] = useState('');
    const [maxCapacityError, setMaxCapacityError] = useState('');
    const maxCapacity = 500;
    const hallName = ''; // Need to set hallName

    useEffect(() => {
      const fetchReservation = async () => {
        try {
          const response = await fetch(`http://localhost:4000/hallR/hallres/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch reservation');
          }
          const data = await response.json();
          setReservation(data.data);
          setFormData({
            bookingName: data.data.hall,
            hallName: data.data.hallid,
            eventType: data.data.eventtype,
            selectDate: data.data.selectdate,
            fromTime: data.data.fromTime,
            toTime: data.data.toTime,
            totalHours: data.data.totalhours,
            capacity: data.data.capacity,
            arrangementStyle: data.data.Resources[0].arrangementStyle,
            numberOfChairs: data.data.Resources[0].numberOfChairs,
            numberOfTables: data.data.Resources[0].numberOfTables,
            foodArrangement: data.data.Resources[0].foodArrangement,
            barArrangement: data.data.Resources[0].barArrangement,
            decorArrangement: data.data.Resources[0].decorArrangement,
            otherRequirements: data.data.otherRequirements
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching reservation:', error);
        }
      };
      fetchReservation();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
     
      // Reset error message when input value is valid
      if (name === 'capacity' && parseInt(value) >= 0) {
        setCapacityError('');
        if (parseInt(value) > maxCapacity) {
          setMaxCapacityError(`Maximum capacity for ${formData.hallName} is ${maxCapacity}`);
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Validation logic
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
  
      // Remaining handleSubmit logic
      try {
        const response = await fetch(`http://localhost:4000/hallR/resupdate/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error('Failed to update reservation');
        }
        console.log('Reservation updated successfully');
      } catch (error) {
        console.error('Error updating reservation:', error);
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

  return (
    <div className="container mt-5 serif">
    <h2>Edit Reservation Form for {formData.bookingName} </h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="mb-3">
          <p className="form-control"> Date: {formData.selectDate}</p>
          <input type="hidden" name="selectDate" value={formData.selectDate} />
        </div>
        <div className="mb-3">
          <p className="form-control">Time: {formData.fromTime} - {formData.toTime}</p>
          <input type="hidden" name="fromTime" value={formData.fromTime} />
        </div>
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
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
          className="form-control"
      
        />
        {capacityError && <div className="text-danger">{capacityError}</div>}
        {maxCapacityError && <div className="text-danger">{maxCapacityError}</div>}
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
    className={`form-control ${chairError ? 'is-invalid' : ''}`}

  />
  {setChairError && <div className="text-danger">{chairError}</div>}
</div>
<div className="mb-3">
  <input
    type="number"
    placeholder="Number of Tables"
    name="numberOfTables"
    value={formData.numberOfTables}
    onChange={handleInputChange}
    className={`form-control ${tableError ? 'is-invalid' : ''}`}
   
  />
  {tableError && <div className="invalid-feedback">{tableError}</div>}
</div>

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
      <div className="mb-3">
        <select
          name="decorArrangement"
          value={formData.decorArrangement}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Decor Arrangement Style</option>
          <option value="modern">Modern</option>
          <option value="vintage">Vintage</option>
          <option value="rustic">Rustic</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="otherRequirements" className="form-label">Other Requirements</label>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
  );
};

export default EditBooking;
