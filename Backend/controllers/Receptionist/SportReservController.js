const { default: mongoose } = require("mongoose");
const watersportReservModel = require("../../Models/watersportReservModel");


// Function to add a new reservation
const addReservation = async (req, res) => {
  console.log("addReservation");
  const { CusName, TelNo, Address, checkinDate, checkinTime, activityList, checkout = false } =
    req.body;

  try {
    const newReserv = await watersportReservModel.create({
      CusName,
      TelNo,
      Address,
      checkinDate,
      checkinTime,
      activityList,
      checkout,
    });
    res.status(201).json(newReserv); // Respond with the created document
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ error: error.message });
  }
};

// Function to get upcoming reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await watersportReservModel.find({ checkout: false });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get past reservations
const getPastReservations = async (req, res) => {
  try {
    const reservations = await watersportReservModel.find({ checkout: true });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservationsByDateTime = async (req, res) => {
  const { selectedDate, selectedTime } = req.query;

  try {
    const activities = await watersportReservModel.find({
      checkinDate: selectedDate,
      checkinTime: selectedTime,
    });

    if (!activities.length) {
      return res.status(404).json({
        message: "No activities found for the selected date and time.",
      });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "Attempting to delete reservation");

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(id, "Invalid ID format");
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await watersportReservModel.findByIdAndDelete(id);

    if (!result) {
      console.log(id, "Reservation not found");
      return res.status(404).json({ message: "Reservation not found" });
    }

    console.log(id, "Reservation deleted successfully");
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

//Function to update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // This contains the fields you want to update

  console.log(id, "Attempting to update reservation");

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id, "Invalid ID format");
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Find the reservation by ID and update it
    // { new: true } option returns the document after update was applied
    const updatedReservation = await watersportReservModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedReservation) {
      console.log(id, "Reservation not found");
      return res.status(404).json({ message: "Reservation not found" });
    }

    console.log(id, "Reservation updated successfully");
    res.status(200).json({
      message: "Reservation updated successfully",
      data: updatedReservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: error.message });
  }
};

//function to checkout a reservation
const checkoutRserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkout } = req.body;

    // Update the checkout status of the reservation with the given ID
    const updatedReservation = await watersportReservModel.findByIdAndUpdate(id, { checkout }, { new: true });
    if (updatedReservation) {
      res.status(200).json(updatedReservation);
    } else {
      res.status(404).send('Reservation not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addReservation,
  getReservations,
  getPastReservations,
  getReservationsByDateTime,
  deleteReservation,
  updateReservation,
  checkoutRserv,
};
