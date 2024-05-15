import React, { useState, useEffect } from "react";
import RoomTypeList from "../../../hooks/Client/roomBooking/useRoomTypeList";
import useDeleteRoom from "../../../hooks/Staff/Rooms/useDeleteRoom";
import useUpdateRoom from "../../../hooks/Staff/Rooms/useUpdateRoom";
import RoomSideBar from "../../../components/RoomSideBar";

function ManageRoom() {
  const { roomTypes: initialRoomTypes, isLoading, error } = RoomTypeList();
  const { deleteRoom } = useDeleteRoom();
  const { updateRoom } = useUpdateRoom();

  const [updatedRtype, setUpdatedRtype] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCapacity, setUpdatedCapacity] = useState("");
  const [updatedNoOfBeds, setUpdatedNoOfBeds] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [roomIdToUpdate, setRoomIdToUpdate] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    setRoomTypes(initialRoomTypes);
  }, [initialRoomTypes]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = async (id) => {
    await deleteRoom(id);
  };

  const getUpdateData = (room) => {
    setRoomIdToUpdate(room._id);
    setUpdatedRtype(room.Rtype);
    setUpdatedDescription(room.description);
    setUpdatedCapacity(room.capacity);
    setUpdatedNoOfBeds(room.NoOfBeds);
    setUpdatedPrice(room.price);
  };

  const handleUpdate = async () => {
    await updateRoom(
      roomIdToUpdate,
      updatedRtype,
      updatedDescription,
      updatedCapacity,
      updatedNoOfBeds,
      updatedPrice
    );

    const updatedRoomTypes = roomTypes.map((room) => {
      if (room._id === roomIdToUpdate) {
        return {
          ...room,
          Rtype: updatedRtype,
          description: updatedDescription,
          capacity: updatedCapacity,
          NoOfBeds: updatedNoOfBeds,
          price: updatedPrice,
        };
      }
      return room;
    });

    setRoomTypes(updatedRoomTypes);

    // Clear the input fields and the roomIdToUpdate after updating
    setUpdatedRtype("");
    setUpdatedDescription("");
    setUpdatedCapacity("");
    setUpdatedNoOfBeds("");
    setUpdatedPrice("");
    setRoomIdToUpdate("");
  };

  const bufferToBase64 = (buf) => {
    return btoa(
      new Uint8Array(buf).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
  };

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

  return (
    <div className="row p-0 m-0">
      <RoomSideBar />
      <div className="col p-0 m-0">
        <div className="col p-0 m-0">
          {roomTypes.map((room) => (
            <div key={room._id} className="col-md-4 mb-3">
              <div className="card mt-5 ms-5" style={{width: "70rem"}}>
                <div className="card-body d-flex">
                  <div>
                    {room.Image && room.Image.data && (
                      <img
                        style={{ width: "10rem" }}
                        src={`data:${room.Image.contentType};base64,${bufferToBase64(room.Image.data.data)}`}
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
                    Delete Room Type
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => getUpdateData(room)}
                  >
                    Update Room Type
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <button
            className="btn btn-primary"
            //style={{ width: "10rem" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageRoom;
