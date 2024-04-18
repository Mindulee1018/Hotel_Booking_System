const express = require('express');
const router = express.Router();

// Import controller functions
const { roomReservation, getreservation, getsinglereservation, cancelreservation } = require('../controllers/reservationController');

// Define routes using controller functions as middleware

//get all reservations
router.get('/getreservation', getreservation);

//get a reservation
router.get('/getonereservation/:id', getsinglereservation);

//make a reservation
router.post('/roomreservation', roomReservation);

//delete a reservation
router.delete('/cancelreservation/:id', cancelreservation); // Assuming you need to pass an ID to cancel reservation

module.exports = router;
