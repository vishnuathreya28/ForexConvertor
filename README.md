# ForexConvertor
Backend Project which gives live forex conversion rate

The Project has the following Functionality.

-> it can convert currency from one forex to the other as long as their right names are mentioned.
-> can display live values of currency required as per user requirements.
-> it can store data of all currency prev value.
-> it can limit the number of API calls being made since there's limited number of those.

for all these detailed documentation with all endpoints are mentioned in the PDF file.

There are certain places you need to make edits for it to run on your system properly.
1. Change the API key.
2. Change the MongoDB database connection endpoint
3. To define the currencies for which live values need to come, change the array of currencies in config.js
4. To limit the number of max API calls being made make edits in rateLimitMiddleware.js
5. To define the startDate from where historical data needs to be stored make changes in config.js startDate