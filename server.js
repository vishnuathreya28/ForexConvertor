const express = require('express');
const bodyParser = require('body-parser');
const conversionRoutes = require('./routes/conversionRoutes');
const exchangeRatesRoutes = require('./routes/exchangeRatesRoutes');
const forexHistoryController = require('./controllers/forexHistoryController');
const forexHistoryRoutes = require('./routes/forexHistoryRoutes');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');
const config = require('./config/config'); // Import your config

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the configuration from config.js
config.database.connect();

app.use(bodyParser.json());


app.use('/conversion', rateLimitMiddleware, conversionRoutes);
app.use('/exchange-rates', rateLimitMiddleware, exchangeRatesRoutes);
app.use('/forex', rateLimitMiddleware, forexHistoryRoutes);

// Fetches and inserts historical forex data when the server starts
forexHistoryController.fetchAndInsertForexData();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
