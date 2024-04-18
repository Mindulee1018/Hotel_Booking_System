const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const {
  getAllReservations,
} = require("../controllers/ReceptionDiningController");

//get all reservations
router.get("/", getAllReservations);

module.exports = router;
