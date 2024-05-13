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

module.exports = { getRoomTypes, addRoomType };
