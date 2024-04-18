const express = require('express')
const mongoose = require('mongoose')
const router=express.Router()


const Hall = require('../Models/hallModel')

const { getAllHalls, createHall ,updateHall,removeHall,getHallById} =require('../controllers/hallController')


router.get('/', getAllHalls);
router.get('/:id',getHallById)
router.post('/add', createHall);
router.put('/update/:id', updateHall);
router.delete('/remove/:id',removeHall)





module.exports = router