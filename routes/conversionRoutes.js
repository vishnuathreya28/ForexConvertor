// routes/conversionRoutes.js
const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversionController');
const authenticateToken = require('../middleware/authenticateToken');

// Currency conversion endpoint
router.post('/convert', authenticateToken, conversionController.convertCurrency);

module.exports = router;
