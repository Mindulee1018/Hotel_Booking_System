import { useState } from "react";
import useAddReservation from "../hooks/useAddReservation";

function AddReservation() {
  const [Date, setDate] = useState("");
  const [Name, setName] = useState("");
  const [Capacity, setCapacity] = useState("");
  const [email, setemail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [formError, setFormError] = useState("");
  const { AddResev, isLoading, error } = useAddReservation();

  const handleSubmit = async (e) => {
    //await AddResev(Date, Name, Capacity, email, ContactNumber);
    e.preventDefault();
    if (!validate()) return;

    await AddResev(Date, Name, Capacity, email, contactNumber);
  };

  const validate = () => {
    const allFieldsFilled = Date && Name && Capacity && email && contactNumber;

    //const errorElement = document.getElementById("Error");
    if (!allFieldsFilled) {
      setFormError("All fields must be filled."); // using React state for error message
      return false;
    } else {
      setFormError(""); // clear error message
      return true;
    }
  };

  return (
    <div className="row d-flex align-items-center justify-content-center">
      <h1 className="m-5">Create Table Reservation</h1>
      <form
        className="bg-primary bg-opacity-50"
        onSubmit={handleSubmit}
        style={{ width: "25rem" }}
      >
        <lable className="form-label mt-3">Enter Date:</lable>
        <input
          type="date"
          id="date"
          name="date"
          className="form-control"
          //min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <lable className="form-label mt-3">Enter Customer Name:</lable>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />

        <lable className="form-label mt-3">No.of.Persons:</lable>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setCapacity(e.target.value)}
        />

        <lable className="form-label mt-3">Email:</lable>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          onChange={(e) => setemail(e.target.value)}
        />

        <lable className="form-label mt-3">Contact Number:</lable>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setcontactNumber(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-success m-4"
          id="submit"
          onClick={validate}
        >
          Add Reservation
        </button>

        {formError && <div id="Error" className="error">{formError}</div>}

        {/* {error && <div className="error">{error}</div>} */}
      </form>
    </div>
  );
}
export default AddReservation;
