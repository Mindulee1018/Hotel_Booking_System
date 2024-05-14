const express = require('express');
const router = express.Router();
const RoomRestock= require('../Models/RoomRestockModel')
const Roominventory = require('../Models/roominventoryModel');

router.put('/:Rid', async (req, res) => {
  const { Rid } = req.params;
  const { itemName, quantity } = req.body;

  try {
    let room = await RoomRestock.findOne({ Rid });
  
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update room restock inventory
    let existingItemIndex = room.items.findIndex(item => item.itemName === itemName);

    if (existingItemIndex !== -1) {
      room.items[existingItemIndex].quantity += quantity;
    } else {
      room.items.push({ itemName, quantity });
    }

    // Update overall inventory
   let roominventory = await Roominventory.findOne({ itemName });

    if (roominventory) {
      roominventory.stockCount -= 2; // Reduce overall inventory stock count
    }else{
      return  res.json({ message: 'Room items do not restock successfully', room });
    }

    await roominventory.save();
    

    res.json({ message: 'Room items restocked successfully', room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { Rid, items } = req.body;

  try {
    // Check if the room restock entry already exists
    let existingRoom = await RoomRestock.findOne({ Rid });

    // If the room restock entry already exists, return an error
    if (existingRoom) {
      return res.status(400).json({ message: 'Room restock entry already exists' });
    }

    // Create a new room restock entry
    const newRoomRestock = new RoomRestock({
      Rid,
      items
    });


    await newRoomRestock.save();

    // Return success message
    res.status(201).json({ message: 'Room restock entry created successfully', newRoomRestock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;