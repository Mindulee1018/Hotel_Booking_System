import React, { useState, useEffect } from "react";
import RoomSideBar from "../../../components/RoomSideBar";
import GetReservebyEmail from "../../../hooks/Client/roomBooking/useGetReservebyEmail";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer';

function MyBookings() {
  const Email = localStorage.getItem("email");
  const { roomReservations = [], isLoading, error } = GetReservebyEmail(Email);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Splits the ISO string on 'T' and returns only the date part
  };

  // Simulated function to fetch logged-in user's email
  // const fetchLoggedInUserEmail = async () => {
  // Replace this with your actual logic to fetch the logged-in user's email
  //const userEmail = "user@example.com"; // Example email
  //setLoggedInUserEmail(userEmail);
  //};

  // useEffect(() => {
  // fetchLoggedInUserEmail();
  //}, []); // Run once on component mount to fetch user's email

  if (isLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    heading: {
        fontSize: 20,
        marginBottom: 30,
        marginTop: 70,
        textAlign: 'center'
    },
    header: {
      position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#007bff',
        color: '#ffffff'
    },
    
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        padding: 5
    },
    cell: {
        width: '20%',
        textAlign: 'center',
        fontSize: 10
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 8 // Adjust font size for the footer
  }
  });
  
  const MyDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.header}>
                
              </View>
            <View style={styles.section}>
                <Text style={styles.heading}>Booking Report</Text>
                <View style={styles.row}>
                    <Text style={styles.cell}>Checkin date</Text>
                    <Text style={styles.cell}>Checkout date</Text>
                    <Text style={styles.cell}>No of Guests</Text>
                    <Text style={styles.cell}>Room Number </Text>
                    <Text style={styles.cell}>Firstname</Text>
                    <Text style={styles.cell}>Lastname</Text>
                    <Text style={styles.cell}>Email</Text>
                    
                    <Text style={styles.cell}> Total Price</Text>

                </View>
                {roomReservations.map(reservation => (
                    <View style={styles.row} key={reservation._id}>
                        <Text style={styles.cell}>{reservation.Checkindate}</Text>
                        <Text style={styles.cell}>{reservation.Checkoutdate}</Text>
                        <Text style={styles.cell}>{reservation.NoOfGuests}</Text>
                        <Text style={styles.cell}>{reservation.RoomNumbers}</Text>
                        <Text style={styles.cell}>{reservation.firstName}</Text>
                        <Text style={styles.cell}>{reservation.lastName}</Text>
                        <Text style={styles.cell}>{reservation.Email}</Text>
                        
                        <Text style={styles.cell}>{reservation.TotalPrice}</Text>
                       
                       
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
    <div>
      <h2>Bookings</h2>
      <PDFDownloadLink document={MyDocument} fileName="bookings_report.pdf"className="btn btn-primary mb-5"style={{marginRight:"2rem"}}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
      <div className="card">
        <table className="table col p-0 m-0">
          <thead>
            <tr>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>No.of.Guests</th>
              <th>Room Type</th>
              <th>No.of.Rooms</th>
              <th>Room Numbers</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {roomReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{formatDate(reservation.Checkindate)}</td>
                <td>{formatDate(reservation.Checkoutdate)}</td>
                <td>{reservation.NoOfGuests}</td>
                <td>{reservation.Rtype}</td>
                <td>{reservation.noofRooms}</td>
                <td>{reservation.RoomNumbers}</td>
                <td>{reservation.firstName}</td>
                <td>{reservation.lastName}</td>
                <td>{reservation.Email}</td>
                <td>{reservation.Address}</td>
                <td>{reservation.phoneno}</td>
                <td>{reservation.TotalPrice}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyBookings;
