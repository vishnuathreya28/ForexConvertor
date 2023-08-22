// services/conversionService.js
const axios = require('axios');
const config = require('../config/config');

exports.convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const exchangeRateResponse = await axios.get(
      'https://openexchangerates.org/api/latest.json?app_id=' + config.apiKey
    );
    const exchangeRates = exchangeRateResponse.data.rates;

    const sourceRate = exchangeRates[sourceCurrency];
    const targetRate = exchangeRates[targetCurrency];
    if (!sourceRate || !targetRate) {
      throw new Error(`Invalid currency codes.`);
    }
    const convertedAmount = (targetRate / sourceRate) * amount;

    return convertedAmount;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('An error occurred while fetching exchange rates.');
  }
};
