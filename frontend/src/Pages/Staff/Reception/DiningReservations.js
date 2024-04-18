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
    <div className="row p-0">
      <ReceptionNavbar />
      <div className="col">
        <h1 className="mb-4 mt-5">Watersport Reservations</h1>

        <div className="d-flex justify-content-around mb-3">
          <table
            className="table table-dark table-striped"
            style={{ width: "75rem" }}
          >
            <thead>
              <tr className="border border-black" scope="col">
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
                <th></th>
              </tr>
            </thead>

            {TableList.map((Table) => (
              <tbody key={Table._id}>
                <tr className="border border-black" scope="col">
                  <td>{Table.Date}</td>

                  <td>{Table.Name}</td>

                  <td>{Table.Capacity}</td>

                  <td>{Table.email}</td>

                  <td>{Table.contactNumber}</td>

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
