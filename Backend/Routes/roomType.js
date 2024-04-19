const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    getRoomTypes,
    addRoomType
} = require("../controllers/roomTypeController");

const upload = multer({ storage: multer.memoryStorage() });

//add new reservation
router.post("/add",upload.single("Image"), addRoomType);

//read reservations
router.get("/", getRoomTypes);

module.exports = router;