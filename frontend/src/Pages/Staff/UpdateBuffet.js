import React, { useState } from "react";
import useDisplayBuffet from "../../hooks/useDisplayBuffet";
import useUpdateBuffet from "../../hooks/useUpdateBuffet";

function UpdateBuffet() {
  const { buffetDetails  } = useUpdateBuffet();
  const { buffetItems, isLoading, error } = useDisplayBuffet();
  const [BuffetName, setBuffetName] = useState("");
  const [ Description, setDescription] = useState("");
  const [Time, setTime] = useState("");
  const [Price, setPrice] = useState("");
  const [Image, setImage] = useState("");
  const [ID, setIdToUpdate] = useState("");
   



  const handleupdate = async (ID) => {

    setIdToUpdate('');
    await buffetDetails(ID)

  }
  return (
    <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">
      <h1 className="mt-2 mb-3 ">Update Buffet Details</h1>
      
            <form
             className="bg-primary bg-opacity-50"
              onSubmit={handleupdate}
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
                  //   value={menu.productName}
                  onChange={(e) => {
                    setBuffetName(e.target.value);
                  }}
                />
              </div>
              
              <div class="mb-3">
                <label className="form-label mt-3">Description:</label>
                <input
                  type="textarea"
                  className="form-control"
                  id="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div class="mb-3">
                <label className="form-label mt-3">Time:</label>
                <input
                  type="number"
                  className="form-control"
                  id="Time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </div>

              <div class="mb-3">
                <label className="form-label mt-3">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  id="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="formFile" className="form-label mt-3">
                  Image File
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>





              <button
                type="submit"
                className="btn btn-success m-4"
                id="submit"
                onClick={() => {

                }}
              >
                Add Buffet Details
              </button>

              <p id="Error"></p>
            </form>
          </div>
        
      

   
  )
}

export default UpdateBuffet;