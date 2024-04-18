import { useState } from "react";
import useAddMenu from "../../hooks/useAddMenu";
import RestaurantNavbar from "../../components/RestaurantManagerNavbar";

const AddNewMenu = () => {
  const [productName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Image, setImage] = useState("");

  const { addMenu, isLoading, error } = useAddMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMenu(productName, Price, category, Image);
  };

  function validation() {
    var submit = document.getElementById("submit");

    if (productName === "" && Price === "" && category === "" ) {
      // document.getElementById("emailError").innerHTML = "Can't be empty";

      document.getElementById("Error").innerHTML = "All fields must be filled.";
    }
  }

  return (
    <div className="row p-0">
      <RestaurantNavbar />
    <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">

        <h1 className="mt-2 mb-3 ">Add New Item</h1>
      
            
            <form
             className="bg-primary bg-opacity-50"
              onSubmit={handleSubmit}
              method="Post"
              style={{ width: "25rem" }}
            >
              <div className="mb-3">
                <label for="ProductName" className="form-label mt-3">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ProductName"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
              </div>

              <div class="mb-3">
                <label className="form-label mt-3">Price</label>
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
                <label className="form-label mt-3">category</label>
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
                  validation();
                }}
              >
               Add Menu Item
              </button>

              <p id="Error"></p>
            </form>
          </div>
          </div>
      

  );
};

export default AddNewMenu;
