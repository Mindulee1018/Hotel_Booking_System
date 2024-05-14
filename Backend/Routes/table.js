const express = require("express");
const mongoose = require("mongoose");
const {
  createReservation,
  getAllReservations,
  getReservationsByEmail,
  deleteTableReservationById,
  updateReservation,
  // getAvailableTables,
  // addTable
  checkAvailability,
 
} = require("../controllers/tableController");
const router = express.Router();

//get all reservations
router.get("/", getAllReservations);

//get a single reservation
router.get("/:email", getReservationsByEmail);

//Create a new reservation
router.post("/add", createReservation);

//DELETE reservation
router.delete("/delete/:id", deleteTableReservationById);

//UPDATE reservation
router.patch("/:id", updateReservation);

//get availability of tables
router.get("/availability/:date/:timeSlot", checkAvailability);

//add tables
// router.post("/add-tables", addTable);

module.exports = router;
