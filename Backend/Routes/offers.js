const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

// controller functions
const {
    addOffer,
    deleteOffer,
    getOffer,
    getsingleOffer,
    updateOffer,
} = require("../controllers/offerController");
const upload = multer({ storage: multer.memoryStorage() });

//get all offers
router.get("/getOffer", getOffer);

//get a single offer
router.get("/getsingleOffer/:id", getsingleOffer);

//add an offer
router.post("/addOffer", upload.single("Image"), addOffer);

//delete offer
router.delete("/deleteOffer/:id", deleteOffer);

//update offer
router.patch("/updateOffer/:id", updateOffer);

module.exports = router;