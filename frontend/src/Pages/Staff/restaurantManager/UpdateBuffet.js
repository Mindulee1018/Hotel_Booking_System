import React, { useState } from "react";
import useDisplayBuffet from "../../../hooks/Client/restaurant/useDisplayBuffet";
import useUpdateBuffet from "../../../hooks/Staff/restaurantManager/useUpdateBuffet";
import { useLocation } from "react-router-dom";

function UpdateBuffet() {
  const { updatePrice  } = useUpdateBuffet();
  const { buffetItems, isLoading, error } = useDisplayBuffet();

   

  const location = useLocation();
  const { BuffetName, price} = location.state || {};

  const [newPrice, setNewPrice] = useState(price);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePrice(BuffetName, newPrice);
      alert("Buffet price updated successfully!");
    } catch (error) {
      console.error("Error updating buffet price:", error);
      alert("An error occurred while updating buffet price.");
    }
  };
  return (
    <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">
      <h1 className="mt-2 mb-3 ">Update Buffet Details</h1>
      
            <form
             className="bg-primary bg-opacity-50"
              onSubmit={handleUpdate}
              method="Post"
              style={{ width: "25rem" }}
            >
              <div className="mb-3">
                <label for="ProductName" className="form-label mt-3">
                Buffet Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="BuffetName"
                    defaultValue={BuffetName}
                    readOnly
                />
              </div>
              


              <div class="mb-3">
                <label className="form-label mt-3">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="Price"
                  defaultValue={price}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>



              <button
                type="submit"
                className="btn btn-success m-4"
                id="submit"
                onClick={() => {

                }}
              >
                Update Buffet Details
              </button>

              <p id="Error"></p>
            </form>
          </div>
        
      

   
  )
}

export default UpdateBuffet;