const { ObjectId } = require("mongodb");
const Reservation = require("../Models/TableReservationsModel")
const mongoose = require("mongoose");



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



const createReservation = async (req, res) => {
try {
  const { tableReservationNo,date, timeSlot, customerName,Noofguests, email, contactNumber } = req.body;

    // Check if the time slot is valid
    if (!timeSlot.includes(timeSlot)) {
      return res.status(400).json({
        message: 'Invalid time slot. Please select a valid time slot.',
      });
    }

    const reservationDate = new Date(date);

    // Count existing reservations for the specified date and time slot
    const reservationCount = await Reservation.countDocuments({
      date: reservationDate,
      timeSlot,
    });

    if (reservationCount > 6) {
      return res.status(409).json({
        message: 'This time slot has reached its reservation limit. Please choose another.',
      });
    }

    // Create the new reservation
    const newReservation = new Reservation({
      tableReservationNo,
      date: reservationDate,
      timeSlot,
      customerName,
      Noofguests,
      email,
      contactNumber,
    });

    await newReservation.save();

    res.status(201).json({
      message: 'Reservation created successfully.',
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating reservation.',
      error: error.message,
    });
  }
};

// Check availability for a specific date and time slot
const checkAvailability = async (req, res) => {
try {
  const { date, timeSlot } = req.params;

  if (!timeSlot.includes(timeSlot)) {
    return res.status(400).json({
      message: 'Invalid time slot. Please select a valid time slot.',
    });
  }

  const reservationDate = new Date(date);

  // Check if the count is within the limit
  const reservationCount = await Reservation.countDocuments({
    date: reservationDate,
    timeSlot,
  });

  const isAvailable = reservationCount < 6;

  res.status(200).json({
    available: isAvailable,
    message: isAvailable ? 'This slot is available.' : 'This slot has reached its limit.',
  });
} catch (error) {
  res.status(500).json({
    message: 'Error checking availability.',
    error: error.message,
  });
}
}

// Get all reservations
const getAllReservations = async (req, res) => {
try {
  const reservations = await Reservation.find();
  res.status(200).json(reservations);
} catch (error) {
  res.status(500).json({
    message: "Error retrieving reservations.",
    error: error.message,
  });
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
  createReservation,
checkAvailability,
getAllReservations,
};
