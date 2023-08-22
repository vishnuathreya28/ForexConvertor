const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose'); // Import mongoose

const exchangeRatesRouter = require('./routes/exchangeRates');
const historicalDataRouter = require('./routes/historicalData');

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = 'cbe7a49e9e3f4b6a81e90230fd17fc31'; // Your API key

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/Forex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit();
  });

// Define routes
app.get('/convert', async (req, res) => {
  const { sourceCurrency, targetCurrency, amount } = req.query;

  try {
    // Fetch exchange rate from Forex API
    const exchangeRateResponse = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`
    );
    const exchangeRates = exchangeRateResponse.data.rates;

    // Calculate converted amount
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
});

app.use('/exchange', exchangeRatesRouter);
app.use('/historical', historicalDataRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
