const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// controller functions
const {
  getNotification,
  addNotification,
  deleteNotification,
} = require("../controllers/notificationController");

//get all rooms
router.get("/", getNotification);

//add a room
router.post("/add", addNotification);

//delete a reservation
router.delete("/notification/:id", deleteNotification);

module.exports = router;
