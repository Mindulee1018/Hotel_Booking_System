const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

// controller functions
const {
  roomAdd,
  deleteRoom,
  getRoom,
  getsingleRoom,
  updateRoom,
} = require("../controllers/roomController");
const upload = multer({ storage: multer.memoryStorage() });

//get all rooms
router.get("/getRoom", getRoom);

//get a single room
router.get("/getsingleRoom/:id", getsingleRoom);

//add a room
router.post("/roomAdd", upload.single("Image"), roomAdd);

//delete a room
router.delete("/deleteRoom/:id", deleteRoom);

//update a room
router.patch("/updateRoom/:id", updateRoom);

module.exports = router;
