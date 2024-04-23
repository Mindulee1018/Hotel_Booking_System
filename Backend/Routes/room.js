const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


// controller functions
const {
  roomAdd,
  deleteRoom,
  getRoom,
  getsingleRoom,
  updateRoom,
} = require("../controllers/roomController");


//get all rooms
router.get("/getRoom", getRoom);

//get a single room
router.get("/getsingleRoom/:id", getsingleRoom);

//add a room
router.post("/add", roomAdd);

//delete a room
router.delete("/deleteRoom/:id", deleteRoom);

//update a room
router.patch("/updateRoom/:id", updateRoom);

module.exports = router;
