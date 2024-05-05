const express = require("express");
const mongoose = require("mongoose");
const {
  createReservation,
  getAllReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
  getAvailableTables,
  addTable
} = require("../controllers/tableController");
const router = express.Router();

//get all reservations
router.get("/", getAllReservations);

//get a single reservation
router.get("/:id", getSingleReservation);

//Create a new reservation
router.post("/add", createReservation);

//DELETE reservation
router.delete("/:id", deleteReservation);

//UPDATE reservation
router.patch("/:id", updateReservation);

//get availability of tables
router.get("/availability/:date/:timeSlot", getAvailableTables);

//add tables
router.post("/add-tables", addTable);

module.exports = router;
