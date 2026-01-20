const redisClient = require("../config/redis");

// Cache Middleware
//  Automatically caches GET API responses in Redis
// Cache key is derived from request URL

//  NOTE:
//  TTL is fixed here for simplicity.
//  In production, this can be made configurable per route.

const cacheMiddleware = async (req, res, next) => {
  try {
    // Use full request URL as cache key
    const key = `cache:${req.originalUrl}`;

    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Store response in Redis after controller sends it
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.setEx(key, 300, JSON.stringify(data)); // TTL = 5M
      return originalJson(data);
    };

    next();
  } catch (error) {
    // If Redis fails, continue without caching
    next();
  }
};

module.exports = cacheMiddleware;
