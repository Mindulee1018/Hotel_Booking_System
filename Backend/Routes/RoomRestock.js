const express = require('express');
const router = express.Router();
const RoomRestock= require('../Models/RoomRestockModel')
const roominventory = require('../Models/roominventoryModel');

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
    let roominventory = await roominventory.findOne({ itemName });

    if (!roominventory) {
      roominventory = new roominventory({ itemName, stockCount });
    } else {
      roominventory.stockCount -= stockCount; // Reduce overall inventory stock count
    }

    await inventoryItem.save();
    await room.save();

    res.json({ message: 'Room items restocked successfully', room });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;