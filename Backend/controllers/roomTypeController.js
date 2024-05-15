const { default: mongoose } = require("mongoose");
const roomType = require("../Models/roomTypeModel");

//get all room types
const getRoomTypes = async (req, res) => {
  try {
    const rooms = await roomType.find({}); //get all data

    res.status(200).json(rooms); //send to browser
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Add a new room type
const addRoomType = async (req, res) => {
  const {
    Rtype,
    description,
    capacity,
    NoOfBeds,
    price,
    NoofRooms,
    RoomNumbers,
  } = req.body;
  let imageData = {};

  const rooms = RoomNumbers?.split(",");

  if (req.file) {
    imageData = {
      data: req.file.buffer, // Buffer containing file data
      contentType: req.file.mimetype, // Mime type of the file
    };
  } else {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const newRoomType = await roomType.create({
      Rtype,
      description,
      capacity,
      NoOfBeds,
      price,
      NoofRooms,
      RoomNumbers: rooms,
      Image: imageData,
    });

    res.status(201).json(newRoomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a room
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { Rid, Rtype, description, capacity, NoOfBeds, price, status } =
    req.body;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Room ID" });
    }

    // Check if the room exists in the database
    const rooms = await roomType.findById(id);
    if (!rooms) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Build the update object based on fields that have changed
    const updateFields = {};
    if (Rid) updateFields.Rid = Rid;
    if (Rtype) updateFields.Rtype = Rtype;
    if (description) updateFields.description = description;
    if (capacity) updateFields.capacity = capacity;
    if (NoOfBeds) updateFields.NoOfBeds = NoOfBeds;
    if (price) updateFields.price = price;
    if (status) updateFields.status = status;

    // Update the room only if at least one field has changed
    if (Object.keys(updateFields).length > 0) {
      const rooms = await roomType.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );
      res.json(rooms);
    } else {
      res.json({ message: "No changes detected" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getRoomTypes, addRoomType, updateRoom };
