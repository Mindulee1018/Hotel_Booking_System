const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");

const {
  getAllMenuDetails,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getCategoryByName,
  getMenuItemsByCategory
} = require("../controllers/menuController");


const upload = multer({ storage: multer.memoryStorage() });

//add new activity
router.post("/add", upload.single("Image"), createMenuItem);

//get all reservations
router.get("/get", getAllMenuDetails);

// Update the route to get menu items by category
router.get("/get/:category", getCategoryByName);

//DELETE reservation
router.delete("/:id", deleteMenuItem);

//UPDATE reservation
router.patch("/:id", updateMenuItem);

//get by category
router.get('/:category', getMenuItemsByCategory)

module.exports = router;
