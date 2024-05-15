import React, { useState } from "react";
import useDisplayTableList from "../../../hooks/Staff/restaurantManager/useDisplayTableResvList";
import useDeleteReservation from "../../../hooks/Staff/restaurantManager/useDeleteTableReservation";
import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const ManageTableReservation = () => {
  const { TableList, isLoading, error } = useDisplayTableList();
  const { deleteTableReservation } = useDeleteReservation();
  const [reservationIdToDelete, setReservationIdToDelete] = useState("");

  const handleDelete = async () => {
    await deleteTableReservation(reservationIdToDelete);
    setReservationIdToDelete("");
  };

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
            <Text style={styles.cell}>No</Text>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>Name</Text>
            <Text style={styles.cell}>TimeSlot</Text>
            <Text style={styles.cell}>Noofguests</Text>
            <Text style={styles.cell}>Email</Text>
            <Text style={styles.cell}>Contact No</Text>
            <Text style={styles.cell}>Actions</Text>
          </View>
          {TableList.map((reservation) => (
            <View style={styles.row} key={reservation._id}>
              <Text style={styles.cell}>{reservation.tableReservationNo}</Text>
              <Text style={styles.cell}>{reservation.date}</Text>
              <Text style={styles.cell}>{reservation.customerName}</Text>
              <Text style={styles.cell}>{reservation.timeSlots}</Text>
              <Text style={styles.cell}>{reservation.Noofguests}</Text>
              <Text style={styles.cell}>{reservation.email}</Text>
              <Text style={styles.cell}>{reservation.contactNumber}</Text>
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
    <div className="row p-0">
      <RestaurantNavbar />
      <div className="col">
        <h1 className="mb-4 mt-5">Manage Reservations</h1>

        <PDFDownloadLink
        document={MyDocument}
        fileName="Table_Reservation.pdf"
        className="btn btn-primary mb-5"
        style={{ marginRight: "2rem" }}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>

        <div className="d-flex align-items-center justify-content-around mb-3">
          <table className="table" style={{ width: "50rem" }}>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">TimeSlot</th>
                <th scope="col">Noofguests</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TableList.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.tableReservationNo}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.customerName}</td>
                  <td>{reservation.timeSlot}</td>
                  <td>{reservation.Noofguests}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.contactNumber}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                      onClick={() => setReservationIdToDelete(reservation._id)}
                    >
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Reservation Modal */}
        <div
          className="modal fade"
          id="Modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  CAUTION
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to cancel this reservation?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTableReservation;
