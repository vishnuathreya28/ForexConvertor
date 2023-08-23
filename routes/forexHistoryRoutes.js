// routes/forexHistoryRoutes.js

const express = require('express');
const router = express.Router();
const forexHistoryController = require('../controllers/forexHistoryController');
const authenticateToken = require('../middleware/authenticateToken');

// Define a route to fetch historical forex data
router.get('/history', forexHistoryController.getHistoricalForexData);

// this is custom route to get data based on custom requirements
router.get('/custom-history', authenticateToken, forexHistoryController.getCustomHistoricalForexData);

module.exports = router;
