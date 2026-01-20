const env = require("./env");
const redis = require("redis");
const logger = require("../utils/logger");

const redisClient = redis.createClient({
  url: env.redisUrl,
});

const connectRedis = async () => {
  try {
    redisClient.on("error", (err) => {
      logger.error("Redis error:", err);
    });

    await redisClient.connect();
    logger.info("Redis connected successfully");
  } catch (error) {
    logger.error("Failed to connect to Redis:", error);
  }
};

// Call connection function
connectRedis();

module.exports = redisClient;
