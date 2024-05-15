const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getRoomTypes,
    addRoomType,
    deleteRoom,
    updateRoom
} = require("../controllers/roomTypeController");

const upload = multer({ storage: multer.memoryStorage() });

//add new reservation
router.post("/add",upload.single("Image"), addRoomType);

//read reservations
router.get("/", getRoomTypes);

//delete a room
router.delete("/deleteRoom/:id", deleteRoom);

//update a room
router.patch("/updateRoom/:id", updateRoom);


module.exports = router;