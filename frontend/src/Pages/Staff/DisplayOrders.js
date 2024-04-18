import { useEffect, useState } from "react";
import useOrderList from "../../hooks/useDisplayFoodOrders";
import useDeleteFoodOrders from "../../hooks/useDeleteFoodOrders";
import useAddOrder from "../../hooks/useAddOrder";
import RestaurantNavbar from "../../components/RestaurantManagerNavbar";

const ManageOrders = () => {
  const { OrderList, isLoading, error } = useOrderList();

  const [idToDelete, setidToDelete] = useState("");
  const { deleteFoodOrders } = useDeleteFoodOrders();
  const { AddOrder} = useAddOrder();

  
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
    await deleteFoodOrders(idToDelete);
    console.log(isLoading, "handleDelete loading");
    setidToDelete("");
  };

  return (

    <div className="row p-0">
    <RestaurantNavbar />
    <div className="col">
      <h1 className="mb-4 mt-5">Manage Orders</h1>

      <div className="d-flex align-items-center justify-content-around mb-3">
        <table className="table" style={{ width: "50rem" }}>
          <tr className="border border-black" scope="col">
            <th scope="col">productName</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">cusName</th>
            <th scope="col">email</th>
            <th scope="col">contactNumber</th>

            <th></th>
          </tr>

          {OrderList.map((Order) => (
            <tbody key={Order._id}>
              <tr className="border border-black" scope="col">

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.productName}
                    readOnly
                  ></input>
                </td>

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.Quantity}
                    readOnly
                  ></input>
                </td>

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.Price}
                    readOnly
                  ></input>
                </td>

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.cusName}
                    readOnly
                  ></input>
                </td>

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.email}
                    readOnly
                  ></input>
                </td>

                <td>

                  <input
                    className="tabledit-input form-control input-sm"
                    type="Text"
                    name="Name"
                    defaultValue={Order.contactNumber}
                    readOnly
                  ></input>
                </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-primary  mt-5"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal"
                    onClick={() => setidToDelete(Order._id)}
                  >
                    Cancel Order
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
              Are you sure you want to cancel this Order?
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

export default ManageOrders;
