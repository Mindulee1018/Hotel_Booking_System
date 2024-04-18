import { useState } from "react";
import React from "react";
import useAddOffer from "../../hooks/useAddOffer";

const AddNewOffer = () => {
  const [offerID, setofferID] = useState("");
  const [offerName, setofferName] = useState("");
  const [Date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [Image, setImage] = useState(null);

  const { addOffers, isLoading, error } = useAddOffer(); // Change this line

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addOffers( // Change this line as well
      offerID,
      offerName,
      Date,
      description,
      Image
    );
  };

  function validation() {
    let valid = true;
    const errorMessages = [];

    if (!offerID || !offerName || !description || !Date || !Image) {
      errorMessages.push("All fields must be filled.");
      valid = false;
    }

    document.getElementById("Error").innerHTML = errorMessages.join(" ");
    return valid;
    // var submit = document.getElementById("submit");

    // if (
    //   offerID === "" &&
    //   offerName === "" &&
    //   description === "" &&
    //   Date === "" 
    // ) {
    //   document.getElementById("Error").innerHTML = "All fields must be filled.";
    // }
  }

  return (
    <div>
      <h2>Add Offer</h2>

      <div className="card">
        <form
          onSubmit={handleSubmit}
          method="Post"
          style={{ width: "18rem", height: "40rem" }}
        >
          <div>
            <label>Offer ID:</label>
            <input
              type="text"
              className=""
              id="offerId"
              onChange={(e) => {
                setofferID(e.target.value);
              }}
            />

            <label>Offer Name:</label>
            <input
              type="text"
              className=""
              id="offerName"
              onChange={(e) => {
                setofferName(e.target.value);
              }}
            />

            <label>Valid Period:</label>
            <input
              type="Date"
              className=""
              id="Date"
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />

            <label>Description:</label>
            <input
              type="text"
              className=""
              id="description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />

            <label>Image file:</label>
            <input
              type="file"
              className=""
              id="offerImage"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="submit"
            onClick={() => {
              validation();
            }}
          >
            Add Offer
          </button>

          <p id="Error"></p>
        </form>
      </div>
    </div>
  );
};

export default AddNewOffer;
