const express = require('express');
const bodyParser = require('body-parser');
const conversionRoutes = require('./routes/conversionRoutes');
const exchangeRatesRoutes = require('./routes/exchangeRatesRoutes');
const forexHistoryController = require('./controllers/forexHistoryController');
const forexHistoryRoutes = require('./routes/forexHistoryRoutes');
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');
// const cacheMiddleware = require('./middleware/cacheMiddleware');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const config = require('./config/config');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the configuration from config.js
config.database.connect();

app.use(bodyParser.json());

// Authentication route
app.use('/auth', authRoutes);

// Protected routes
app.use('/api', protectedRoutes); // Change 'api' to your desired API route prefix

// Verify JWT and set user in request object
app.use((req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    req.user = null; // No user authenticated
    return next();
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      req.user = null; // Invalid token
    } else {
      req.user = user;
    }
    next();
  });
});

// Routes for different functionalities

// Conversion routes
app.use('/api/conversion', rateLimitMiddleware, conversionRoutes);

// Exchange rates routes
app.use('/api/exchange-rates', rateLimitMiddleware, exchangeRatesRoutes);

// Forex history routes
app.use('/api/forex', rateLimitMiddleware, forexHistoryRoutes);

// Fetches and inserts historical forex data when the server starts
forexHistoryController.fetchAndInsertForexData();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
