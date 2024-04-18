import { useState } from "react";
import React from "react";

import RoomSideBar from "../../../components/RoomSideBar";
import useAddRoom from "../../../hooks/Staff/Rooms/useAddRoom";

const AddNewRoom = () => {
  const [Rid, setRid] = useState("");
  const [Rtype, setRtype] = useState("");
  const [description, setdescription] = useState("");
  const [capacity, setcapacity] = useState("");
  const [NoOfBeds, setNoOfBeds] = useState("");
  const [price, setprice] = useState("");
  const [status, setstatus] = useState("");
  const [Image, setImage] = useState(null);

  const { addRoom, isLoading, error } = useAddRoom();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addRoom(
      Rid,
      Rtype,
      description,
      capacity,
      NoOfBeds,
      price,
      status,
      Image
    );
  };

  function validation() {
    var submit = document.getElementById("submit");

    if (
      Rid === "" &&
      Rtype === "" &&
      description === "" &&
      capacity === "" &&
      NoOfBeds === "" &&
      price === "" &&
      status === ""
    ) {
      document.getElementById("Error").innerHTML = "All fields must be filled.";
    }
  }

  return (
    <div className="row p-0 m-0">
   
      <RoomSideBar />
     
      <div className="col p-0 m-0" >
      
      <div className="background vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url("katha.jpg")' }}>
      <div className="card" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", width: "400px", textAlign: "center" }}>
        
        <form
          onSubmit={handleSubmit}
          method="Post"
          style={{ display: "flex", flexDirection: "column",  height:"400px"}}
        >
          <h2 className="m-4">Add Room</h2>
          <div>
            <label>Room ID:</label>
            <input
              type="text"
              className=""
              id="roomId"
              onChange={(e) => {
                setRid(e.target.value);
              }}
            />

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

            <label>Status:</label>
            <input
              type="text"
              className=""
              id="roomStatus"
              onChange={(e) => {
                setstatus(e.target.value);
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
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            id="submit"
            onClick={() => {
              validation();
            }}
          >
            Add Room
          </button>

          <p id="Error"></p>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
export default AddNewRoom;