const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const {
  AddActivity,
  getActivity,
  deleteActivity,
  updateActivity,
} = require("../controllers/watersportController");
const upload = multer({ storage: multer.memoryStorage() });

//add new activity
router.post("/add", upload.single("Image"), AddActivity);

//read activities
router.get("/", getActivity);

//delete activity
router.delete("/activities/:id", deleteActivity);

//update activity
router.put("/activities/:activityName", updateActivity);

module.exports = router;
