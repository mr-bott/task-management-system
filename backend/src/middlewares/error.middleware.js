const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  const statusCode = err.statusCode || 500;  // sending 500 Interenal server error

  res.status(statusCode).json({  
    success: false,
    message: err.message || "Internal Server Error"
  });
};


// exporting 
module.exports = errorHandler;
