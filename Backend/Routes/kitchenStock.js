const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//controller functions
const {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
  getsingleStock,
} = require('../controllers/kitchenStockController');


//add stock route
router.post('/add', addStock);
//update stock route
router.put('/update/:id',updateStock);

//get stocks route
router.get('/',getStocks);
//get a single stock route
router.get('/:id', getsingleStock);

//delete stock route
router.delete('/delete/:stockName',deleteStock);

module.exports = router;