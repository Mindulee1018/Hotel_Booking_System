// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserEmails } = require('../controllers/Receptionist/userEmailController');

// Endpoint to get all user emails
router.get('/emails', getUserEmails);

module.exports = router;