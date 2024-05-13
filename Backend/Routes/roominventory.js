const express = require('express');
const roominventory = require('../Models/roominventoryModel');

const router = express.Router();

//adding data
router.route("/add").post((req, res) => {
    const itemID = req.body.itemID;
    const itemName = req.body.itemName;
    const description = req.body.description;
    const unit_price = req.body.unit_price;
    const stockCount = req.body.stockCount;
    const reorderPoint = req.body.reorderPoint;

    const newRoomInventory = new roominventory({
        itemID,
        itemName,
        description,
        unit_price,
        stockCount,
        reorderPoint
    })

    newRoomInventory.save().then(() =>{
        res.json("New item added")
    }).catch((err) => {
        console.log(err);
    })
})


//get data
router.route("/").get((req, res) => {
    roominventory.find().then((inventory) => {
        res.json(inventory)
    }).catch((err) => {
        console.log(err)
    })
})


//updating data
router.route('/update/:ID').patch(async (req, res) => {
    const {ID}= req.params;
    const {itemID,itemName,description,unit_price,stockCount,reorderPoint
    } = req.body;

    try{
    const updateRoomInventory = {
        itemID,
        itemName,
        description,
        unit_price,
        stockCount,
        reorderPoint
    }

    const update = await roominventory.findOneAndUpdate(
        {itemID:ID},
        updateRoomInventory ,
        {new:true}
    );
    // .then(() => {
    //     res.status(200).send({status: "Room inventory is updated"})
    if (!update) {
        return res.status(404).json({ message: "error" });
      }
  
      res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });


//deleting data
router.route("/delete/:id").delete(async (req, res) => {
    let id = req.params.id;

    await roominventory.findByIdAndDelete(id)
    .then(() =>{
        res.status(200).send({status: "Inventory item deleted"});
     }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting item", error: err.message});
     })
})


router.route("/get/:id").get((req, res) => {
    let id = req.params.id;

    roominventory.findById(id).then((inventory) => {
        res.json(inventory)
    }).catch((err) => {
        console.log(err)
    })

})

module.exports = router; 