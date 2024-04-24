const express = require('express');
const router = express.Router();

// Import controller functions
const { roomReservation, getreservation, getPastReservations, getAvailableRooms, cancelreservation,checkoutRserv } = require('../controllers/reservationController');

// Define routes using controller functions as middleware

//get all reservations
router.get('/getreservation', getreservation);

//get past reservations
router.get("/pastReserv", getPastReservations);

//check room availability
router.get('/getAvailableRooms', getAvailableRooms);

//make a reservation
router.post('/add', roomReservation);

//delete a reservation
router.delete('/cancelreservation/:id', cancelreservation);

// checkout a reservation
router.patch('/checkout/:id', checkoutRserv);

module.exports = router;
