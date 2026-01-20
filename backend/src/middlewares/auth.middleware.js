const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Bearer <token>

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        // 401 status
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1]; //spliting

    const decoded = verifyToken(token); // verify token

    req.user = decoded; // { id, role }
    next(); // next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

//Exporting authMiddleware
module.exports = authMiddleware;
