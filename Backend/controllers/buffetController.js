const { ObjectId } = require("mongodb");
const Buffet = require("../Models/buffetModel");
const mongoose = require("mongoose");

//get all buffets
const getAllBuffetDetails = async (req, res) => {
  try {
    const buffet = await Buffet.find({});

    res.status(200).json(buffet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//create a New Buffet
const createBuffet= async (req, res) => {
  const { BuffetName,  Description, Time, Price } = req.body;
  let imageData = {};

   console.log(req.file, "file");

  if (req.file) {
     //Assuming the file is uploaded and accessible via req.file
    imageData = {
      data: req.file.buffer, // Buffer containing file data
      contentType: req.file.mimetype, // Mime type of the file
    };
   } else {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const buffet = await Buffet.create({
        BuffetName,
        Description,
        Time,
        Price,
        Image: imageData, // Store the image data directly
    });
    res.status(201).json(buffet); // Respond with the created document
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to update an existing activity
const updateBuffet = async (req, res) => {
  const { buffetName } = req.params; 
  const { Price } = req.body; 

  try {
    const updatedBuffet = await Buffet.findOneAndUpdate(
      { BuffetName: buffetName }, 
      { Price },
      { new: true } 
    );

    if (!updatedBuffet) {
      return res.status(404).json({ message: "Buffet not found" });
    }

    res.status(200).json(updatedBuffet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteBuffet = async (req, res) => {
  try {
    const { id } = req.params; // Capture the `id` from URL parameters
    // Validate id format to ensure it is a valid ObjectId

    console.log(id, "deleteBuffet");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const buffet = await Buffet.findByIdAndDelete(id);

    if (!buffet) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    res.status(200).json({ message: "Menu Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {

  createBuffet,
  updateBuffet,
  deleteBuffet,
  getAllBuffetDetails
};
