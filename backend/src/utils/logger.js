const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }), // writing in app.log file
  ],
});

module.exports = logger;
