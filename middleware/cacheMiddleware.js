const redis = require("redis");
const config = require("../config/config")


const client = redis.createClient(config.redisHost, config.redisPort);


const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  client.get(key, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return next();
    }

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      const originalSend = res.send;

      res.send = (body) => {
        client.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
        originalSend.call(res, body);
      };

      next();
    }
  });
};

module.exports = cacheMiddleware;
