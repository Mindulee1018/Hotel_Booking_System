const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const {getAllDetails, createDetails,getImageByName } = require('../controllers/HotelSchemaController')

router.get('/hoteldetails',getAllDetails)
router.post('/Addhoteldetails',createDetails)
router.get('/images/:imageName',getImageByName )

module.exports = router