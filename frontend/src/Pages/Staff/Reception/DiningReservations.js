import useTableList from "../../../hooks/Staff/Reception/useDiningReserv";
import ReceptionNavbar from "../../../components/receptionNavbar";

const DiningReservations = () => {
  const { TableList, isLoading, error } = useTableList();

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

  return (
    <div className="row">
      <ReceptionNavbar />
      <div className="col">
        <h1 className="my-5">Dining Reservations</h1>

        <div className="card" style={{ width: "75rem" }}>
          <table
            className="table"
            
          >
            <thead>
              <tr>
                <th scope="col">Table Reservation No</th>
                <th scope="col">Date</th>
                <th scope="col">Time Slot</th>
                <th scope="col">Guests</th>
                <th scope="col">Contact No</th>
                <th scope="col">Email</th>
                <th></th>
              </tr>
            </thead>

            {TableList.map((Table) => (
              <tbody key={Table._id}>
                <tr>
                  <td>{Table.tableReservationNo}</td>

                  <td>{Table.date}</td>

                  <td>{Table.timeSlot}</td>

                  <td>{Table.Noofguests}</td>

                  <td>{Table.contactNumber}</td>

                  <td>{Table.email}</td>

                  <td>
                    <a
                      href="#"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                    >
                      CheckOut
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiningReservations;
