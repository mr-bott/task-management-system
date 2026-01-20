const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

//import required modules 
const authRoutes = require("./modules/auth/auth.routes");
const taskRoutes = require("./modules/tasks/task.routes");
const adminRoutes=require("./modules/admin/admin.routes")
const errorHandler = require("./middlewares/error.middleware");
const swaggerSpec = require("../swagger/swagger");
const logger = require("./utils/logger");

const app = express();

// Body parser
app.use(express.json());

// Request logging (console)
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Error handler (always last)
app.use(errorHandler);

module.exports = app;
