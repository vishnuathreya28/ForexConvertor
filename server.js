const express = require('express');
const bodyParser = require('body-parser');
const conversionRoutes = require('./routes/conversionRoutes');
const exchangeRatesRoutes = require('./routes/exchangeRatesRoutes');
const forexHistoryController = require('./controllers/forexHistoryController');
const forexHistoryRoutes = require('./routes/forexHistoryRoutes');
const config = require('./config/config'); // Import your config

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the configuration from config.js
config.database.connect();

app.use(bodyParser.json());

// Routes
app.use('/conversion', conversionRoutes); //to convert currencies live
app.use('/exchange-rates', exchangeRatesRoutes); //to display live currency rates based on their value w.r.t 1USD
app.use('/forex', forexHistoryRoutes); // this should display the past data

// Fetches and inserts historical forex data when the server starts
forexHistoryController.fetchAndInsertForexData();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
