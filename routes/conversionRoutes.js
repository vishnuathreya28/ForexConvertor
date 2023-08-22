// routes/conversionRoutes.js
const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversionController');

// Currency conversion endpoint
router.post('/convert', conversionController.convertCurrency);

module.exports = router;
