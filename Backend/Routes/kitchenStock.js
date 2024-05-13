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
  getsingleName
} = require('../controllers/kitchenStockController');


//add stock route
router.post('/add', addStock);
//update stock route
router.put('/update/:id',updateStock);

//get stocks route
router.get('/',getStocks);

// Get a stock by name route
router.get('/name/:stockname', getsingleName);

//get a single stock route
router.get('/:id', getsingleStock);


//delete stock route
router.delete('/delete/:stockName',deleteStock);

module.exports = router;