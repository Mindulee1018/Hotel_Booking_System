const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const {
    createBuffet,
    updateBuffet,
    deleteBuffet,
    getAllBuffetDetails
} = require("../controllers/buffetController");


const upload = multer({ storage: multer.memoryStorage() });

//add new activity
router.post("/add", upload.single("Image"), createBuffet);

//get all reservations
router.get("/get",  getAllBuffetDetails);

//DELETE reservation
router.delete("/:id", deleteBuffet);

//UPDATE reservation
router.put("/update/:buffetName", updateBuffet);


module.exports = router;

