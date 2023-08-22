// controllers/forexController.js

const axios = require('axios');
const ForexData = require('../models/forexData');
const config = require('../config/config');

// Assuming you have your Open Exchange Rates API key stored in a variable called API_KEY

// Fetch historical forex data for a specific date
const fetchHistoricalForexData = async (date) => {
  try {
    const response = await axios.get('https://openexchangerates.org/api/historical/' + config.startDate + '.json?app_id=' + config.apiKey
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical forex data:', error);
    throw error;
  }
};

// Insert historical forex data into the MongoDB database
const insertForexDataIntoDatabase = async (date) => {
    try {
      const existingData = await ForexData.findOne({ date: new Date(date) });
  
      if (existingData) {
        console.log(`Forex data for ${date} already exists in the database. Skipping insertion.`);
        return;
      }
  
      const forexData = await fetchHistoricalForexData(date);
  
      const exchangeRatesArray = Object.entries(forexData.rates).map(([currency, rate]) => ({
        currency,
        rate,
      }));
  
      const forexDataDocument = new ForexData({
        date: new Date(date),
        exchangeRates: exchangeRatesArray,
      });
  
      await forexDataDocument.save();
      console.log(`Forex data for ${date} inserted into the database.`);
    } catch (error) {
      console.error('Error inserting forex data into the database:', error);
      throw error;
    }
  };
  
  // Fetch and insert forex data from the start date to today
const fetchAndInsertForexData = async () => {
    const startDate = new Date(config.startDate);
    const currentDate = new Date();
  
    while (startDate <= currentDate) {
      const formattedDate = startDate.toISOString().slice(0, 10);
      await insertForexDataIntoDatabase(formattedDate);
  
      startDate.setDate(startDate.getDate() + 1);
    }
  };
  

// Fetch historical forex data
const getHistoricalForexData = async (req, res) => {
    try {
      const historicalData = await ForexData.find().sort({ date: 'asc' });
  
      res.json({ data: historicalData });
    } catch (error) {
      console.error('Error fetching historical forex data:', error);
      res.status(500).json({ error: 'An error occurred while fetching historical forex data.' });
    }
  };

// To fetch custom data
const getCustomHistoricalForexData = async (req, res) => {
    try {
      const { currencies, startDate, endDate } = req.query;
      const query = {};
  
      if (currencies) {
        const currencyArray = currencies.split(',');
        const exchangeRateQueries = currencyArray.map(curr => ({ [`exchangeRates.${curr}`]: { $exists: true } }));
        query.$or = exchangeRateQueries;
    }
  
      if (startDate) {
        query.date = { $gte: new Date(startDate) };
      }
  
      if (endDate) {
        if (query.date) {
          query.date.$lte = new Date(endDate);
        } else {
          query.date = { $lte: new Date(endDate) };
        }
      }
  
      const customData = await ForexData.find(query).sort({ date: 'asc' });
  
      res.json({ data: customData });
    } catch (error) {
      console.error('Error fetching custom historical forex data:', error);
      res.status(500).json({ error: 'An error occurred while fetching custom historical forex data.' });
    }
  };
  


module.exports = {
  insertForexDataIntoDatabase,
  fetchAndInsertForexData,
  getHistoricalForexData,
  getCustomHistoricalForexData
};


