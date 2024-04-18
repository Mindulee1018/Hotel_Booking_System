const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//controller functions
const {
  addBulkStock,
  getBulkStocks,
  updateBulkStock,
  deleteBulkStock,
  getsingleBulkStock,
} = require('../controllers/kitchenBulkStockController');


//add stock route
router.post('/add', addBulkStock);
//update stock route
router.put('/update/:id',updateBulkStock);

//get stocks route
router.get('/',getBulkStocks);
//get a single stock route
router.get('/:id', getsingleBulkStock);

//delete stock route
router.delete('/delete/:bulkStockName',deleteBulkStock);

module.exports = router;