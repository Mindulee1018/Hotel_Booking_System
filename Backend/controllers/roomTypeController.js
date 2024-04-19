const { default: mongoose } = require("mongoose");
const room = require("../Models/roomTypeModel");

//get all room types
const getRoomTypes = async (req, res) => {
    try {
      const rooms = await room.find({}); //get all data
  
      res.status(200).json(rooms); //send to browser
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
//Add a new room type
const addRoomType = async (req, res) => {
  const { Rtype, description, capacity, NoOfBeds, price} =
    req.body;
  let imageData = {};

  console.log(req.file, "fileee");

  if (req.file) {
    imageData = {
      data: req.file.buffer, // Buffer containing file data
      contentType: req.file.mimetype, // Mime type of the file
    };
  } else {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const newRoomType = await room.create({
      Rtype,
      description,
      capacity,
      NoOfBeds,
      price,
      Image: imageData,
    });

    res.status(201).json(newRoomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  

  module.exports = { getRoomTypes, addRoomType };