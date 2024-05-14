import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const { productname, price, _id } = location.state || {};

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateMenuItem(_id, productName, Price);
      alert("Menu item updated successfully");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'ProductName') {
      setProductName(value);
    } else if (name === 'Price') {
      setPrice(value);
    }
  };
  

  return (
    <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">
      <h2 className="mt-2 mb-3 ">Update Product </h2>
      <form
        className="bg-primary bg-opacity-50"
        onSubmit={handleUpdate}
        method="Post"
        style={{ width: "25rem", position: "relative", top: "17vh" }}
      >
        <div className="mb-3">
          <label htmlFor="ProductName" className="form-label mt-3">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="ProductName"
            name="ProductName"
            defaultValue={productname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label mt-3">Price:</label>
          <input
            type="number"
            className="form-control"
            defaultValue={price}
            id="Price"
            name="Price"
            onChange={handleChange}
          />
        </div>


        <button type="submit" className="btn btn-success m-4" id="submit">
          Update Details
        </button>

        <p id="Error"></p>
      </form>
    </div>
  );
}

export default UpdateMenu;