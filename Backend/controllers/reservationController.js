const { default: mongoose } = require('mongoose')
const roomreservation = require('../Models/RoomReservationModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

//get all reservations
const getreservation = async (req,res) =>{
  const room = await roomreservation.find({})//get all data
  res.status(200).json(room)//send to browser
}

//get single reservation
const getsinglereservation = async (req,res) =>{

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'invalid id'})
  }

  const room = await roomreservation.findById(id)

  if(!room){
    res.status(404).json({error: 'No such reservation'})
  }

  res.status(200).json(room)
}


//make a room reservation
const roomReservation = async (req, res) => {
  const { Checkindate, Checkoutdate, NoOfGuests,RoomID, Name, email, Address, phoneno ,RoomResvID,price} = req.body; // Correct the variable name 'status' to 'Status'

  try {

      const Reserv = await testreserv.create({
          Checkindate, Checkoutdate, NoOfGuests,Rid,Name, email, Address, phoneno,RoomResvID,price
      });
      res.status(201).json(Reserv);
  } catch (error) {
      console.log(error, "error");
      res.status(400).json({ error: error.message });
  }
};

//cancel a reservation
const cancelreservation = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    // Find and delete the room reservation
    const room = await roomreservation.findOneAndDelete( id );

    if (!room) {
      return res.status(404).json({ error: 'No such reservation' });
    }

    return res.status(200).json({ status: 'reservation deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



  module.exports={
    getreservation,
    getsinglereservation,
    roomReservation,
    cancelreservation
  }  