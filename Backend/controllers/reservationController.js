const { default: mongoose } = require("mongoose");
const roomreservation = require("../Models/RoomReservationModel");
const roomTypeModel = require("../Models/roomTypeModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//get all reservations
const getreservation = async (req, res) => {
  const room = await roomreservation.find({checkout: false});
  res.status(200).json(room); 
};

// Function to get past reservations
const getPastReservations = async (req, res) => {
  try {
    const room = await roomreservation.find({ checkout: true });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//make a room reservation
const roomReservation = async (req, res) => {
  const {
    Checkindate,
    Checkoutdate,
    NoOfGuests,
    Rtype,
    noofRooms,
    RoomNumbers,
    firstName,
    lastName,
    Email,
    Address,
    phoneno,
    TotalPrice,
  } = req.body;

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  try {
    const Reserv = await roomreservation.create({
      Checkindate : formatDate(Checkindate),
      Checkoutdate : formatDate(Checkoutdate),
      NoOfGuests,
      Rtype,
      noofRooms,
      RoomNumbers,
      firstName,
      lastName,
      Email,
      Address,
      phoneno,
      TotalPrice,
    });
    res.status(201).json(Reserv);
  } catch (error) {
    console.log(error, "error");
    res.status(400).json({ error: error.message });
  }
};

const getAvailableRooms = async (req, res) => {
  const { Checkindate, Checkoutdate, Rtype } = req.query;

  console.log(Checkindate, Checkoutdate, Rtype, "availability");

  // Convert strings to Date objects including time
  const checkInDate = new Date(Checkindate);
  const checkOutDate = new Date(Checkoutdate);

  try {
    // Fetch all reservations that conflict with the requested dates for the specific room type
    const roomsListForGivenType = await roomTypeModel.find({
      Rtype,
    });

    const allRoomsList = roomsListForGivenType[0]?.RoomNumbers;

    const reservedRoomsList = await roomreservation.find({
      Checkindate: checkInDate,
      Checkoutdate: checkOutDate,
      Rtype,
    });

    const bookedRooms = reservedRoomsList
      .map((reservation) => reservation.RoomNumbers)
      .flat();

    const availableRooms = allRoomsList.filter(
      (room) => !bookedRooms.includes(room)
    );

    if (availableRooms.length > 0) {
      res.status(200).json(availableRooms);
    } else {
      res.status(404).json({
        message: "No available rooms for the selected type and dates.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//cancel a reservation
const cancelreservation = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    // Find and delete the room reservation
    const room = await roomreservation.findOneAndDelete(id);

    if (!room) {
      return res.status(404).json({ error: "No such reservation" });
    }

    return res.status(200).json({ status: "reservation deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//function to checkout a reservation
const checkoutRserv = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkout } = req.body;

    // Update the checkout status of the reservation with the given ID
    const updatedReservation = await roomreservation.findByIdAndUpdate(id, { checkout }, { new: true });
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
  getreservation,
  getPastReservations,
  getAvailableRooms,
  roomReservation,
  cancelreservation,
  checkoutRserv
};
