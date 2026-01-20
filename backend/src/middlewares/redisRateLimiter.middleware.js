const redisClient = require("../config/redis");

 //Redis-based Rate Limiter Middleware 
 // Limits number of requests per IP

const redisRateLimiter = (maxRequests = 100, windowSeconds = 100) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `rate_limit:${ip}`;

      // Increment request count
      const requestCount = await redisClient.incr(key);

      // Set expiry only on first request
      if (requestCount === 1) {
        await redisClient.expire(key, windowSeconds);
      }

      // If limit exceeded
      if (requestCount > maxRequests) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (error) {
      // Fail open: do not block request if Redis fails
      next();
    }
  };
};

module.exports = redisRateLimiter;
