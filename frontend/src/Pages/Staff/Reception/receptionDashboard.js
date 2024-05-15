import React, { useState, useEffect } from "react";
import ReceptionNavbar from "../../../components/receptionNavbar";
import useActivityList from "../../../hooks/Staff/Reception/useActivityList";
import useWatersportReservation from "../../../hooks/Staff/Reception/useWatersportReservations";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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
  const [reservationDetails, setReservationDetails] = useState([]);

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
            reservation?.activityList.some(
              (res) => res.id === activity.Activity
            ) &&
            reservation.checkinDate === today &&
            reservation.checkinTime.startsWith(slot)
        );

        return !isBooked; // true if available, false if booked
      });

      return { activity: activity.Activity, availability: slotsAvailability };
    });

    // Aggregate reservation data
    const activityReservationDetails = ActivityList.map((activity) => {
      const reservationsToday = reservationList.filter(
        (reservation) =>
          reservation.activityList.some(
            (res) => res.id === activity.Activity
          ) && reservation.checkinDate === today
      );

      const reservedTimeSlots = reservationsToday.map(
        (reservation) => reservation.checkinTime
      );

      return {
        activity: activity.Activity,
        count: reservationsToday.length,
        timeSlots: reservedTimeSlots.join(", "),
      };
    });

    setAvailability(availabilityMap);
    setReservationDetails(activityReservationDetails);
  }, [ActivityList, reservationList]);

  if (isLoadingActivities || isLoadingReservations) {
    return <div>Loading...</div>;
  }

  if (errorActivities || errorReservations) {
    return <div>Error: {errorActivities || errorReservations}</div>;
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    heading: {
      fontSize: 20,
      marginBottom: 30,
      marginTop: 70,
      textAlign: "center",
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      marginBottom: 20,
      backgroundColor: "#007bff",
      color: "#ffffff",
    },
    logo: {
      width: 100,
      height: 50,
    },
    row: {
      flexDirection: "row",
      borderBottomColor: "#000000",
      borderBottomWidth: 1,
      padding: 5,
    },
    cell: {
      width: "20%",
      textAlign: "center",
      fontSize: 10,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: 8, // Adjust font size for the footer
    },
  });

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* <Image src={logo} style={styles.logo} /> */}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}> Watersport Reservation Reports</Text>
          <View style={styles.row}>
            <Text style={styles.cell}>Activity Name</Text>
            <Text style={styles.cell}>No.of.reservations</Text>
            <Text style={styles.cell}> Reserved Time slots</Text>
          </View>
          {reservationDetails.map((detail) => (
            <View style={styles.row} key={detail.Activity}>
              <Text style={styles.cell}>{detail.activity}</Text>
              <Text style={styles.cell}>{detail.count}</Text>
              <Text style={styles.cell}>{detail.timeSlots}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>
          Downloaded: {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );

  return (
    <div className="row mb-5">
      <div className="col-lg-2" aria-colspan={2}>
        <ReceptionNavbar />
      </div>

      <div className="col-lg-10">
        <h1 className="m-5">Welcome to Reception Dashboard!</h1>
        <h2 className="m-5">Activity Availability Map</h2>
        <div className="d-flex justify-content-around mb-3">
          <table style={{ width: "55rem" }}>
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
            <tbody className="text-start">
              {availability.map((item) => (
                <tr key={item.activity}>
                  <td className="border border-black">{item.activity}</td>
                  {item.availability.map((isAvailable, index) => (
                    <td
                      className="border border-black"
                      key={index}
                      style={{
                        backgroundColor: isAvailable ? "" : "red",
                        opacity: 0.5, // Adds 50% opacity
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

      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10">
        <h2 className="m-5">{new Date().toLocaleString()}Activity Reservations Summary</h2>

          <PDFDownloadLink
            document={MyDocument}
            fileName="Activity_Reservation_Report.pdf"
            className="btn btn-primary mb-5"
            
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>

          <div className="d-flex justify-content-center">
            <table style={{ width: "35rem" }}>
              <thead>
                <tr>
                  <th className="border border-black">Activity Name</th>
                  <th className="border border-black">No.of.reservations</th>
                  <th className="border border-black">Reserved Time slots</th>
                </tr>
              </thead>

              <tbody className="text-start">
                {reservationDetails.map((detail) => (
                  <tr key={detail.Activity}>
                    <td className="border border-black">{detail.activity}</td>
                    <td className="border border-black">{detail.count}</td>
                    <td className="border border-black">
                      {detail.timeSlots || "None"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionDashboard;
