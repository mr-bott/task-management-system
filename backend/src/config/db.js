const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

const connectDB = async () => {
  // Function to connect to MongoDB
  try {
    await mongoose.connect(env.mongoUrl); // MongoDB connection

    logger.info(" MongoDB connected successfully");
  } catch (error) {
    // MongoDB connection error handling
    logger.error(" MongoDB connection failed");
    logger.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function
module.exports = connectDB;
