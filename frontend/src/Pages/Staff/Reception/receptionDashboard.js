import React, { useState, useEffect } from "react";
import ReceptionNavbar from "../../../components/receptionNavbar";
import useActivityList from "../../../hooks/Staff/Reception/useActivityList";
import useWatersportReservation from "../../../hooks/Staff/Reception/useWatersportReservations";

function ReceptionDashboard() {
  const {
    ActivityList,
    isLoading: isLoadingActivities,
    error: errorActivities,
  } = useActivityList();
  const {
    reservationList,
    isLoading: isLoadingReservations,
    error: errorReservations,
  } = useWatersportReservation();
  const [timeSlots, setTimeSlots] = useState([]);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    // Define time slots from 9 AM to 5 PM (9:00 to 17:00), hourly.
    const slots = Array.from({ length: 9 }, (_, i) => `${9 + i}:00`);
    setTimeSlots(slots);

    // Calculate today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Check availability for each activity at each time slot
    const availabilityMap = ActivityList.map((activity) => {
      const slotsAvailability = slots.map((slot) => {
        const isBooked = reservationList.some(
          (reservation) =>
            reservation?.activityList.some(res => res.id === activity.Activity) &&
            reservation.checkinDate === today &&
            reservation.checkinTime.startsWith(slot)
        );

        return !isBooked; // true if available, false if booked
      });

      return { activity: activity.Activity, availability: slotsAvailability };
    });

    setAvailability(availabilityMap);
  }, [ActivityList, reservationList]);

  if (isLoadingActivities || isLoadingReservations) {
    return <div>Loading...</div>;
  }

  if (errorActivities || errorReservations) {
    return <div>Error: {errorActivities || errorReservations}</div>;
  }

  return (
    <div className="row">
      <ReceptionNavbar />
      <div className="col">
        <h1 className="m-5">Welcome to Reception Dashboard!</h1>
        <h2 className="m-5">Today Activity Availability Map</h2>
        <div className="d-flex justify-content-around mb-3">
          <table style={{ width: "65rem" }}>
            <thead>
              <tr>
                <th className="border border-black">Activity</th>
                {timeSlots.map((time) => (
                  <th className="border border-black" key={time}>
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {availability.map((item) => (
                <tr key={item.activity}>
                  <td className="border border-black">{item.activity}</td>
                  {item.availability.map((isAvailable, index) => (
                    <td
                      className="border border-black"
                      key={index}
                      style={{
                        backgroundColor: isAvailable ? "" : "red",
                        opacity: 0.50, // Adds 50% opacity
                      }}
                    >
                      {/* {isAvailable ? "Available" : "Booked"} */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReceptionDashboard;
