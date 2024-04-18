const express = require('express');
const router = express.Router();
const {
    addReservation,
    editReservation,
    getAllReservations,
    getReservationById,
    deleteReservation,
    getReservationByEmail
} = require('../controllers/hallReserveController');

// Route to add a new reservation
router.post('/addres', addReservation);

// Route to edit a reservation by ID
router.put('/resupdate/:id', editReservation);

// Route to get all reservations
router.get('/hallres', getAllReservations);

// Route to get a reservation by ID
router.get('/hallres/:id', getReservationById);
router.get('/hallresbyemail/:email', getReservationByEmail);

router.delete('/hallres/:id', deleteReservation);

module.exports = router;
