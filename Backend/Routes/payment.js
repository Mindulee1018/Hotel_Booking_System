const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const { sendEmail, 
    createPayment, 
    //getPayments, 
    //getUserPayment, 
    //deletePayment,
 } = require("../controllers/paymentController");

// Create payment
router.post("/create_payment", createPayment);

// Send email
router.post("/send-email", sendEmail);

// Get all payments
//router.get("/", getPayments);

// Get payment by ID
//router.get("/user_payment/:id", getUserPayment);


// Delete payment
//router.delete("/delete_payment/:id", deletePayment);

module.exports = router;