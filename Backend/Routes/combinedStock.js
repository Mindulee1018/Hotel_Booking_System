const express = require('express');
const router = express.Router();
const kitchenBulkStock = require('./kitchenBulkStock');
const kitchenStock = require('./kitchenStock');

// Mount routes for bulk stock and stock data
router.use('/', kitchenBulkStock);
router.use('/', kitchenStock); 

module.exports = router;