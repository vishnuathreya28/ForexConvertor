# ForexConvertor
Backend Project which gives live forex conversion rate

The Project has the following Functionality.

There are certain places you need to make edits for it to run on your system properly.
1. Change the API key.
2. Change the MongoDB database connection endpoint


The file structure is as follows

forex-exchange-api/
├── config/
│   ├── config.js            # Configuration settings (e.g., API keys, rate limits)
├── controllers/
│   ├── conversionController.js   # Handles currency conversion requests
│   ├── exchangeRateController.js # Handles live exchange rate requests
│   └── historicalDataController.js # Handles historical data requests
├── middlewares/
│   ├── authentication.js   # Authentication middleware (JWT handling)
│   ├── rateLimiting.js     # Rate limiting middleware
│   └── errorHandling.js    # Custom error handling middleware
├── models/
│   └── exchangeRate.js     # MongoDB schema and model for historical exchange rates
├── routes/
│   ├── conversionRoutes.js   # Currency conversion endpoints
│   ├── exchangeRateRoutes.js # Live exchange rate endpoints
│   └── historicalRoutes.js   # Historical data endpoints
├── services/
│   ├── conversionService.js   # Business logic for currency conversion
│   ├── exchangeRateService.js # Business logic for fetching live exchange rates
│   └── historicalService.js   # Business logic for historical data
├── utils/
│   ├── cache.js             # Caching logic using Redis
│   └── helpers.js           # Helper functions
├── server.js                   # Main Express application setup
└── README.md                # Project documentation and setup instructions

Endpoints to Test out functionality

1. http://localhost:(port)/conversion/convert - to test conversion between different types of currency
input is to be provided in 
{
  "sourceCurrency": "ZWL",
  "targetCurrency": "USD",
  "amount": 100
}
output is generated as
{
    "convertedAmount": 0.3105590062111801
}

2. 