import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const HallCalendar = () => {
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:4000/hallR/hallres');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        if(data.data){
            let dataset = [];
            data.data.map(d => {
                // console.log( d['hall'], d['selectdate'], d['fromTime'], `${d['selectdate']}T${d['fromTime']}`)
                dataset.push({
                    "start":new Date(`${d['selectdate']}T${d['fromTime']}`), //2024-02-03T13:00:00Z
                    "end": new Date(`${d['selectdate']}T${d['toTime']}`),
                    "title": d['hallid'] + "-" + d['eventtype']+" " + "by "+ d["hall"]
                    
                })
            })
           setEvents(dataset);
        }
        setReservations(data.reservations || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to fetch reservations. Please try again later.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleAddEvent = () => {
    const updatedEvents = [...reservations, newEvent];
    setReservations(updatedEvents);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Calendar</h2>
      <div className="mb-4">
        <h3>Add New Event</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Event Title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          
          <input
            type="datetime-local"
            className="form-control mb-2"
            name="start"
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            className="form-control mb-2"
            name="end"
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleAddEvent}>Add Event</button>
        </div>
      </div>
      <div className="mb-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default HallCalendar;
