const { ObjectId } = require("mongodb");
const Table = require("../Models/tableModel");
const mongoose = require("mongoose");

//get all reservations
const getAllReservations = async (req, res) => {
  const table = await Table.find({}).sort({ createdAt: -1 });

  res.status(200).json(table);
};

//get a single reservation
const getSingleReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findById(id);

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};

//create a new reservation
const createReservation = async (req, res) => {
  const { Date, Name, Capacity, email, contactNumber } = req.body;

  //add doc to db
  try {
    const table = await Table.create({
      Date,
      Name,
      Capacity,
      email,
      contactNumber,
    });
    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findOneAndDelete({ _id: id });

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};

//update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};

module.exports = {
  createReservation,
  getAllReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
