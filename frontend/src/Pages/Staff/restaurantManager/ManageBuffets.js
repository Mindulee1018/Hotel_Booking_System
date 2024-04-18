import { useEffect, useState } from "react";
import useDisplayBuffet from '../../../hooks/Client/restaurant/useDisplayBuffet'
import useDeleteBuffet from '../../../hooks/Staff/restaurantManager/useDeleteBuffet'
import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";

const ManageBuffet = () => {
  const { buffetItems, isLoading, error } = useDisplayBuffet();
  const [id, setidToDelete] = useState("");
  const { deleteBuffetItem } = useDeleteBuffet();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const bufferToBase64 = (buf) => {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  };

  const handleDelete = async () => {
    await deleteBuffetItem(id);
    console.log(isLoading, "handleDelete loading");
    setidToDelete("");
  };

  return (
    <div className="row p-0">
    <RestaurantNavbar />
    <div className="col">
     <h1 class="mb-4 mt-5">Buffet Management</h1>

     <a href="/addBuffet" className="btn btn-info mb-5" >
            Add New Buffet
          </a>

     <div className="row d-flex align-items-center justify-content-around mb-3"> 
            {buffetItems.map((item) => (
              <div key={item._id} className="col-lg-3">
                <div className="card mb-4">
                  <div className="card-body">
                    {item.Image && item.Image.data && (
                      <img
                      style={{ width: "10rem" }}
                      src={`data:${
                        item.Image.contentType
                      };base64,${bufferToBase64(item.Image.data.data)}`}
                      className="card-img-top mb-1"
                      alt={item.Image}
                    />
                    )}
                    <h2 className="card-title">{item.BuffetName}
                    </h2>
                    <p className="card-text fw-medium">
                    {item. Description}
                    </p>
                    <h4>{item.Time}</h4>

                    <h5>Price: Rs.{item.Price}.00</h5>

                    <a
                      href="#"
                      className="btn btn-danger "
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                      onClick={() => setidToDelete(item._id)}
                    >
                     Delete Buffet Details
                    </a>
                    <a className="btn btn-primary"
                      //onClick={() => getUpdateMenu(item._id)}
                      href="/updateBuffet"
                    >Update</a>
                  </div>
                </div>
              </div>
            ))}

            
            {/* </div> */}
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
          Are you sure you want to delete this Buffet Details?
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
             Delete
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

export default ManageBuffet;