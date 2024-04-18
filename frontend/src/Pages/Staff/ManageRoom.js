import React, { useState } from "react";
import RoomList from "../../hooks/useRoomList";
import useDeleteRoom from "../../hooks/useDeleteRoom";
import useUpdateRoom from "../../hooks/useUpdateRoom";
//import ManagerPanel from '../../components/RoomManagerNavbar';
import RoomSideBar from "../../components/RoomSideBar";

function ManageRoom() {
  const { rooms, isLoading, error } = RoomList();
  const { deleteRoom } = useDeleteRoom();
  const { updateRoom } = useUpdateRoom();

  // State variables to hold the updated values
  const [updatedRtype, setUpdatedRtype] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCapacity, setUpdatedCapacity] = useState("");
  const [updatedNoOfBeds, setUpdatedNoOfBeds] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [roomIdToUpdate, setRoomIdToUpdate] = useState(""); // Hold the id of the room to update

  if (isLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id) => {
    await deleteRoom(id);
  };

  const handleUpdate = async () => {
    // Call the updateRoom function with the updated values
    await updateRoom(
      roomIdToUpdate,
      updatedRtype,
      updatedDescription,
      updatedCapacity,
      updatedNoOfBeds,
      updatedPrice
    );

    // Clear the input fields and the roomIdToUpdate after updating
    setUpdatedRtype("");
    setUpdatedDescription("");
    setUpdatedCapacity("");
    setUpdatedNoOfBeds("");
    setUpdatedPrice("");
    setRoomIdToUpdate("");
  };

  return (
    <div>
       <RoomSideBar/>
      <div className="row bs">
        {rooms.map((room) => (
          <div key={room._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body d-flex">
                <div>
                  {room.Image && room.Image.data && (
                    <img
                      style={{ width: "10rem" }}
                      src={`data:${room.Image.contentType};base64,${btoa(
                        String.fromCharCode.apply(null, room.Image.data.data)
                      )}`}
                      className="card-img-top mb-1"
                      alt={room.Rtype}
                    />
                  )}
                </div>

                <div className="ms-3">
                <p className="card-text">Room Id: {room.Rid}</p>
                <p className="card-text">Room Type: {room.Rtype}</p>
                <p className="card-text">{room.description}</p>
                <p className="card-text">Capacity: {room.capacity}</p>
                <p className="card-text">No.of.Beds: {room.NoOfBeds}</p>
                <p className="card-text">Price: {room.price}</p>
               
                </div>
              </div>
              <div className="card-footer d-flex justify-content-center bg-secondary">
                <button
                  className="btn btn-primary me-3"
                  onClick={() => handleDelete(room._id)}
                >
                  Delete Room
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setRoomIdToUpdate(room._id)}
                >
                  Update Room
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {roomIdToUpdate && (
        <div className="mt-3 p-3" style={{ backgroundColor: "white" }}>
          <h3>Update Room</h3>
          <input
            type="text"
            value={updatedRtype}
            onChange={(e) => setUpdatedRtype(e.target.value)}
            className="form-control mb-2"
            placeholder="Updated Room Type"
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="form-control mb-2"
            placeholder="Updated Description"
          />
          <input
            type="text"
            value={updatedCapacity}
            onChange={(e) => setUpdatedCapacity(e.target.value)}
            className="form-control mb-2"
            placeholder="Updated Capacity"
          />
          <input
            type="text"
            value={updatedNoOfBeds}
            onChange={(e) => setUpdatedNoOfBeds(e.target.value)}
            className="form-control mb-2"
            placeholder="Updated Number of Beds"
          />
          <input
            type="text"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="form-control mb-2"
            placeholder="Updated Price"
          />
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageRoom;
