// exchangeRates.js
const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_KEY = 'cbe7a49e9e3f4b6a81e90230fd17fc31'; // Your API key

router.get('/live', async (req, res) => {
  const predefinedCurrencies = ['USD', 'EUR', 'GBP', 'INR']; // Predefined set of currencies

  try {
    // Fetch live exchange rates from Forex API
    const exchangeRateResponse = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`
    );
    const exchangeRates = exchangeRateResponse.data.rates;

    const liveRates = {};
    for (const currency of predefinedCurrencies) {
      if (exchangeRates[currency]) {
        liveRates[currency] = exchangeRates[currency];
      }
    }

    res.json(liveRates);
  } catch (error) {
    console.error('Error fetching live exchange rates:', error);
    res.status(500).json({ error: 'An error occurred while fetching live exchange rates.' });
  }
});

module.exports = router;
