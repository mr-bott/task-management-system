const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const logger = require("./utils/logger");

// Connect to database
connectDB();

// Start server
app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection");
  logger.error(err.message);
  process.exit(1);
});
