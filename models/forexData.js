const mongoose = require('mongoose');

const forexDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  exchangeRates: [
    {
      currency: String, // Currency code
      rate: Number,     // Exchange rate
    }
  ],
});

const ForexData = mongoose.model('ForexData', forexDataSchema);

module.exports = ForexData;
