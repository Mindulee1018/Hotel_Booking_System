const { default: mongoose } = require("mongoose");
const room = require("../Models/offerModel");

//get all offers
const getOffer = async (req, res) => {
  try {
    const offers = await offer.find({}); //get all data

    res.status(200).json(offers); //send to browser
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single offer
const getsingleOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "invalid id" });
  }

  const offers = await offer.findById(id);

  if (!offers) {
    res.status(404).json({ error: "No such offers" });
  }

  res.status(200).json(offers);
};

//Add a offer
const addOffer = async (req, res) => {
  const { offerID, offerName, Date,description} =
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
    const newOffer = await offers.create({
      offerID,
      offerName,
      Date,
      description,
      Image: imageData,
    });

    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a offer
const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    // Find and delete the offer
    const offer = await room.findOneAndDelete(id);

    if (!offers) {
      return res.status(404).json({ error: "No such offer" });
    }

    return res.status(200).json({ status: "offer deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update a offer
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const { offerID, offerName, Date, description} =
    req.body;

  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid offer ID" });
    }

    // Check if the offer exists in the database
    const offers = await offer.findById(id);
    if (!offers) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Build the update object based on fields that have changed
    const updateFields = {};
    if (offerID) updateFields.offerID = offerID;
    if (offerName) updateFields.offerName = offerName;
    if (Date) updateFields.Date = Date;
    if (description) updateFields.description = description;

    // Update the offer only if at least one field has changed
    if (Object.keys(updateFields).length > 0) {
      const offers = await offer.findByIdAndUpdate(
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

module.exports = { getOffer, getsingleOffer, addOffer, deleteOffer, updateOffer };
