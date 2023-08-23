const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/config'); // Import your config
const authenticateToken = require('../middleware/authenticateToken');

const prominentCurrencies = config.currencies; // Add more currencies as needed

router.get('/live', authenticateToken, async (req, res) => {
  try {
    const exchangeRateResponse = await axios.get(
        'https://openexchangerates.org/api/latest.json?app_id=' + config.apiKey
    );
    const exchangeRates = exchangeRateResponse.data.rates;

    const filteredExchangeRates = {};
    for (const currency of prominentCurrencies) {
      if (exchangeRates[currency]) {
        filteredExchangeRates[currency] = exchangeRates[currency];
      }
    }

    res.json(filteredExchangeRates);
  } catch (error) {
    console.error('Error fetching live exchange rates:', error);
    res.status(500).json({ error: 'An error occurred while fetching live exchange rates.' });
  }
});

module.exports = router;
