const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// controller functions
const {
    getNotification,
    addNotification,
 
} = require("../controllers/notificationController");

//get all rooms
router.get("/", getNotification);

//add a room
router.post("/add", addNotification);



module.exports = router;
