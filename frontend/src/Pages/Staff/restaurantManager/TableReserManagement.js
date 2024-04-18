import { useEffect, useState } from "react";
import useTableList from "../../../hooks/Client/restaurant/useTableResvList";
import useDeleteReservation from "../../../hooks/Staff/restaurantManager/useDeleteTableReservation";
import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";

const ManageTableReservation = () => {
  const { TableList, isLoading, error } = useTableList();

  const [nameToDelete, setNameToDelete] = useState("");
  const { deleteTableReservation } = useDeleteReservation();

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

  const handleDelete = async () => {
    await deleteTableReservation(nameToDelete);
    console.log(isLoading, "handleDelete loading");
    setNameToDelete("");
  };

  return (
    <div className="row p-0">
      <RestaurantNavbar />
      <div className="col">
        <h1 className="mb-4 mt-5">Manage Reservations</h1>

        <div className="d-flex align-items-center justify-content-around mb-3">
          <table className="table" style={{ width: "50rem" }}>
            <tr className="border border-black" scope="col">
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No</th>

              <th></th>
            </tr>

            {TableList.map((Table) => (
              <tbody key={Table._id}>
                <tr className="border border-black" scope="col">
                  <td>
                    <input
                      className="tabledit-input form-control input-sm"
                      type="Date"
                      name="Date"
                      defaultValue={Table.Date}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <input
                      className="tabledit-input form-control input-sm"
                      type="Text"
                      name="Name"
                      defaultValue={Table.Name}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <input
                      className="tabledit-input form-control input-sm"
                      type="number"
                      name="Capacity"
                      defaultValue={Table.Capacity}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <input
                      className="tabledit-input form-control input-sm"
                      type="email"
                      name="email"
                      defaultValue={Table.email}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <input
                      className="tabledit-input form-control input-sm"
                      type="Number"
                      name="contactNumber"
                      defaultValue={Table.contactNumber}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-primary "
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                      onClick={() => setNameToDelete(Table._id)}
                    >
                      Cancel Reservation
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {/*delete model  */}
        <div
          className="modal fade"
          id="Modal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  CAUTION
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to cancel this Reservation?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <form action="" method="delete">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDelete}
                  >
                    CANCEL
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTableReservation;
