const express = require("express");
const mongoose = require("mongoose");
const {
    createOrder,
    getAllOrders,
    deleteOrder
} = require("../controllers/orderController");
const router = express.Router();

//get all reservations
router.get("/", getAllOrders);

//Create a new reservation
router.post("/add", createOrder);

//DELETE reservation
router.delete("/:id",  deleteOrder);

module.exports = router;
