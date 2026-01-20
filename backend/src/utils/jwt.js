const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (payload) => {
  //generate token with payload
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

const verifyToken = (token) => {
  //verify token
  return jwt.verify(token, env.jwtSecret);
};
//export
module.exports = {
  generateToken,
  verifyToken,
};
