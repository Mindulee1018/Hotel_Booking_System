const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const {
  addReservation,
  getReservations,
  getPastReservations,
  deleteReservation,
  updateReservation,
  getReservationsByDateTime,
  checkoutRserv,
} = require("../controllers/Receptionist/SportReservController");

//add new reservation
router.post("/add", addReservation);

//read reservations
router.get("/", getReservations);

//get past reservations
router.get("/pastReserv", getPastReservations);

//get reservations by date and time
router.get("/getReservations", getReservationsByDateTime);

//delete a reservation
router.delete("/reservations/:id", deleteReservation);

//Update a reservation
router.put("/reservations/:id", updateReservation);

// Assuming you have an express app and this endpoint is set up correctly
router.patch('/checkout/:id', checkoutRserv);
  


module.exports = router;
