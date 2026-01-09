Forex Converter Service

A backend service that provides live foreign exchange (FX) conversion rates, historical rate storage, and API usage controls.
Designed as a financial data service with an emphasis on correctness, rate limiting, and persistence.

Overview

This project exposes REST APIs to:

Convert between supported currency pairs using live FX rates

Fetch current exchange rates for selected currencies

Store and query historical exchange rate data

Control and optimize third-party API usage through rate limiting

The system is structured to simulate a real-world financial data ingestion and serving pipeline, rather than a one-off conversion utility.

Key Features

Live FX Rate Conversion

Converts between supported currency pairs using real-time exchange rate data

Validates currency inputs to prevent invalid conversions

Current Rate Retrieval

Allows clients to fetch live rates for a configurable set of currencies

Designed for extensibility as additional currency pairs are added

Historical Data Persistence

Stores previous exchange rate values in a database

Enables tracking and analysis of rate changes over time

API Call Optimization & Rate Limiting

Implements middleware to restrict the number of outbound API calls

Prevents exceeding third-party API quotas

Reduces unnecessary network requests by caching and controlled polling

Architecture (High-Level)

Backend: Node.js (REST API)

Database: MongoDB (historical rate storage)

External Dependency: Third-party FX rate provider

Middleware:

Rate limiting

Configuration-based controls for currencies and data windows

The service is intentionally modular so that:

Data sources can be swapped

Storage can be extended

Rate-limiting policies can be tuned independently

Configuration & Setup

Before running the service locally, update the following configuration values:

API Key

Replace the FX provider API key with your own credentials

Database Connection

Update the MongoDB connection string to point to your local or hosted instance

Tracked Currencies

Modify the currencies array in config.js to define which currencies are fetched and stored

Rate Limiting

Adjust thresholds in rateLimitMiddleware.js to control the maximum number of API calls

Historical Data Window

Update the startDate value in config.js to define how far back historical data should be collected

Design Considerations

API quota awareness: Designed to operate within strict third-party API limits

Data correctness: Ensures consistent currency handling and validation

Extensibility: Built to support additional currencies, data sources, or storage backends

Separation of concerns: Configuration, rate limiting, and data logic are isolated for maintainability

Notes

This project was originally developed as part of a quantitative/financial engineering application and focuses on financial data handling and backend system design rather than trading strategy or alpha generation.
