// historicalRates.js
const mongoose = require('mongoose');

const historicalRatesSchema = new mongoose.Schema({
  baseCurrency: { type: String, required: true },
  targetCurrency: { type: String, required: true },
  date: { type: Date, required: true },
  exchangeRate: { type: Number, required: true }
});

module.exports = mongoose.model('HistoricalRates', historicalRatesSchema);
