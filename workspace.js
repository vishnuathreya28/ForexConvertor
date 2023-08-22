// index.js
const express = require('express');
const mongoose = require('mongoose');
const exchangeRatesRouter = require('./exchangeRates');
const historicalDataRouter = require('./historicalData');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Internship_Backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/exchange', exchangeRatesRouter);
app.use('/historical', historicalDataRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
