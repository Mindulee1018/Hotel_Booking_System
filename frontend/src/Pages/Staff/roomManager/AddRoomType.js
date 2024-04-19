import { useState } from "react";
import RoomSideBar from "../../../components/RoomSideBar";
import useAddRoomType from "../../../hooks/Staff/Rooms/useAddRoomType";

const AddNewRoomType = () => {
  const [Rtype, setRtype] = useState("");
  const [description, setdescription] = useState("");
  const [capacity, setcapacity] = useState("");
  const [NoOfBeds, setNoOfBeds] = useState("");
  const [price, setprice] = useState("");
  const [Image, setImage] = useState(null);

  const { addRoomType, isLoading, error, isSuccess } = useAddRoomType();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Rtype || !description || !capacity || !NoOfBeds || !price) {
      alert("All fields must be filled.");
      return;
    }

    addRoomType(Rtype, description, capacity, NoOfBeds, price, Image);
  };

  return (
    <div className="row p-0 m-0">
      <RoomSideBar />
      <div className="col p-0 m-0">
        <div className="background vh-100 d-flex justify-content-center align-items-center">
          <div
            className="card"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "600px",
              }}
            >
              <h2 className="m-4">Add Room</h2>
              <label>Room Type:</label>
              <input
                type="text"
                className=""
                id="roomType"
                onChange={(e) => {
                  setRtype(e.target.value);
                }}
              />

              <label>Description:</label>
              <input
                type="text"
                className=""
                id="roomDescription"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />

              <label>Capacity:</label>
              <input
                type="number"
                className=""
                id="roomCapacity"
                onChange={(e) => {
                  setcapacity(e.target.value);
                }}
              />

              <label>No of Beds:</label>

              <input
                type="number"
                className=""
                id="roombeds"
                onChange={(e) => {
                  setNoOfBeds(e.target.value);
                }}
              />

              <label>Price:</label>
              <input
                type="number"
                className=""
                id="roomPrice"
                onChange={(e) => {
                  setprice(e.target.value);
                }}
              />

              <label>Image file:</label>
              <input
                type="file"
                className=""
                id="roomImage"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />

              <button type="submit" className="btn btn-primary" id="submit">
                Add Room
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {isSuccess && (
                <p style={{ color: "green" }}>Room added successfully!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewRoomType;
