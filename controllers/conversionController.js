// controllers/conversionController.js
const axios = require('axios');
const config = require('../config/config');

exports.convertCurrency = async (req, res) => {
  const { sourceCurrency, targetCurrency, amount } = req.body;

  try {
    const exchangeRateResponse = await axios.get(
      'https://openexchangerates.org/api/latest.json?app_id=' + config.apiKey
    );
    const exchangeRates = exchangeRateResponse.data.rates;

    const sourceRate = exchangeRates[sourceCurrency];
    const targetRate = exchangeRates[targetCurrency];
    if (!sourceRate || !targetRate) {
      return res.status(400).json({ error: 'Invalid currency codes.' });
    }
    const convertedAmount = (targetRate / sourceRate) * amount;

    res.json({ convertedAmount });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({ error: 'An error occurred while fetching exchange rates.' });
  }
};
