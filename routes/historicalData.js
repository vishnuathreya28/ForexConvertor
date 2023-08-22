// historicalData.js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const HistoricalRates = require('../models/historicalRates'); // Assuming you have the schema defined

const router = express.Router();
const API_KEY = 'cbe7a49e9e3f4b6a81e90230fd17fc31'; // Your API key

router.get('/historical', async (req, res) => {
  const { baseCurrency, targetCurrency } = req.query;
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  try {
    const historicalData = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(sevenDaysAgo);
      currentDate.setDate(currentDate.getDate() + i);
      
      // Fetch historical data for each day
      const historicalResponse = await axios.get(
        `https://openexchangerates.org/api/historical/${currentDate.toISOString().slice(0, 10)}.json?app_id=${API_KEY}`
      );
      
      const exchangeRates = historicalResponse.data.rates;
      const exchangeRate = exchangeRates[targetCurrency];
      
      if (exchangeRate) {
        historicalData.push({
          baseCurrency,
          targetCurrency,
          date: currentDate,
          exchangeRate
        });
      }
    }
    
    // Insert historical data into MongoDB
    await HistoricalRates.insertMany(historicalData);
    
    res.json({ message: 'Historical data inserted successfully.' });
  } catch (error) {
    console.error('Error fetching or inserting historical data:', error);
    res.status(500).json({ error: 'An error occurred while fetching or inserting historical data.' });
  }
});

module.exports = router;
