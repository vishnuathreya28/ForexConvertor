// rateLimitMiddleware.js
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per IP per hour
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;