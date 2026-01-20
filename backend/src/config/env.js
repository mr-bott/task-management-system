require("dotenv").config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,

  // Database
  mongoUrl: process.env.MONGO_URL,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",

  // REDIS 
  redisUrl:process.env.REDIS_URL
};

// Validate required environment variables
if (!env.mongoUrl) {
  throw new Error(" MONGO_URL is not defined in .env");
}
// Validate JWT secret
if (!env.jwtSecret) {
  throw new Error(" JWT_SECRET is not defined in .env");
}

// Export the configuration object
module.exports = env;
