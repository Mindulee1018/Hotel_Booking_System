import React, { useState } from "react";
import useMenuList from "../../../hooks/Staff/restaurantManager/useMenu";
import useUpdateMenu from "../../../hooks/Staff/restaurantManager/useUpdateMenuItem";

function UpdateMenu() {
  const { updateMenuItem } = useUpdateMenu();
  const [productName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { menuList, isLoading, error } = useMenuList();
  const [ID, setIdToUpdate] = useState("");
   const [Image, setImage] = useState("");



  const handleupdate = async (ID) => {

    setIdToUpdate('');
    await updateMenuItem(ID)

  }
  return (
    <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">
      <h1 className="mt-2 mb-3 ">Update Product Details</h1>
    
            <form
            className="bg-primary bg-opacity-50"
              onSubmit={handleupdate}
              method="Post"
              style={{ width: "25rem" }}
            >
              <div className="mb-3">
                <label for="ProductName" className="form-label mt-3">
                  Product Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ProductName"
                  //   value={menu.productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
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
                <label className="form-label mt-3">category:</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  onChange={(e) => {
                    setCategory(e.target.value);
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
                Update Details
              </button>

              <p id="Error"></p>
            </form>
          </div>
    
      

    
  )
}

export default UpdateMenu;