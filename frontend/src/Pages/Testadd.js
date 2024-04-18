import React, { useState } from 'react';

const Testadd= () => {
    const [formData, setFormData] = useState({
        hall: '',
        eventtype: '',
        capacity: '',
        selectdate: '',
        fromTime: '',
        toTime: '',
        totalhours: '',
        status: '',
        resources: '',
        userid: '65f47fd2435e6437ddcb9ec1',
        hallid: '66091b49a3b21f794f0e29aa'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/hallR/addres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (responseData.success) {
                alert(responseData.message);
                // Optionally, redirect or perform other actions after successful submission
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Reservation Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="hall">Hall:</label>
                <input type="text" id="hall" name="hall" value={formData.hall} onChange={handleChange} required /><br /><br />

                <label htmlFor="eventtype">Event Type:</label>
                <input type="text" id="eventtype" name="eventtype" value={formData.eventtype} onChange={handleChange} required /><br /><br />

                <label htmlFor="capacity">Capacity:</label>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required /><br /><br />

                <label htmlFor="selectdate">Date:</label>
                <input type="date" id="selectdate" name="selectdate" value={formData.selectdate} onChange={handleChange} required /><br /><br />

                <label htmlFor="fromTime">From:</label>
                <input type="time" id="fromTime" name="fromTime" value={formData.fromTime} onChange={handleChange} required /><br /><br />

                <label htmlFor="toTime">To:</label>
                <input type="time" id="toTime" name="toTime" value={formData.toTime} onChange={handleChange} required /><br /><br />

                <label htmlFor="totalhours">Total Hours:</label>
                <input type="number" id="totalhours" name="totalhours" value={formData.totalhours} onChange={handleChange} required /><br /><br />

                <label htmlFor="status">Status:</label>
                <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required /><br /><br />

                <label htmlFor="resources">Resources:</label>
                <input type="text" id="resources" name="resources" value={formData.resources} onChange={handleChange} /><br /><br />

                <label htmlFor="userid">User ID:</label>
                <input type="text" id="userid" name="userid" value={formData.userid} onChange={handleChange} required /><br /><br />

                <label htmlFor="hallid">Hall ID:</label>
                <input type="text" id="hallid" name="hallid" value={formData.hallid} onChange={handleChange} required /><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Testadd;
